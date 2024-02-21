'use server';
import {z} from 'zod';
import {sql} from '@vercel/postgres';
import { revalidatePath } from '@/node_modules/next/cache';
import { redirect } from '@/node_modules/next/navigation';

const InvoiceDataSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending','paid']),
    date: z.string(),
});

const checkInvoice = InvoiceDataSchema.omit({id:true,date:true});



export async function createInvoice(formData : FormData){
    console.log("begin form");
    const rowData = checkInvoice.parse(Object.fromEntries(formData.entries()));
    const incAmount = rowData.amount*100;
    const incDate = new Date().toISOString().split('T')[0];
    console.log(rowData);
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${rowData.customerId}, ${incAmount}, ${rowData.status}, ${incDate})
    `;
    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");

}


export async function updateInvoice(id:string,formData:FormData) {

    const {customerId,amount,status} = checkInvoice.parse({
        customerId:formData.get('customerId'),
        amount:formData.get('amount'),
        status : formData.get('status'),
    })
    
    const amountInCents = amount*100;
    await sql`UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}`;

    revalidatePath("/dashboard/invoices");
    redirect('/dashboard/invoices')
}


export async function deleteInvoice(id:string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    
}
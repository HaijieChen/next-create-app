'use client';

import { lusitana } from '@/app/ui/fonts';
import { useEffect, useState } from "react";
import styles from '@/app/ui/MapContainer.css';
import AMapLoader from "@amap/amap-jsapi-loader";

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  let map = null;
   const [lng,setLng]=useState(116.397428);
   const [lat,setLat]=useState(39.90923);
   setInterval(() => {
    setLng(117.397428);
    setLat(39.90923);
   }, 10000);
  useEffect(() => {
    AMapLoader.load({
      key: "b41da0f5fe33967c06a3e518950651d7", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          center: [lng, lat], // 初始化地图中心点位置
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, [lat,lng]);

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
         实时地图
      </h2>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="rounded-xl bg-gray-50 p-4">
      <div id="container" className={styles.container} style={{ height: "800px" }}></div>
      </div>
    </div>
  );
}

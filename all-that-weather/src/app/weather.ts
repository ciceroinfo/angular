export class Weather {
   coord:{
      lon:string;
      lat:string;
   };

   weather:[
      {
         id:string;
         main:string;
         description:string;
         icon:string;
      }
   ];

   base:string;

   main:{
      temp:string;
      pressure:string;
      humidity:string;
      temp_min:string;
      temp_max:string;
   };

   visibility:string;

   wind:{
      speed:string;
      deg:string;
      gust:string;
   };

   clouds:{
      all:string;
   };

   dt:string;

   sys:{
      type:string;
      id:string;
      message:string;
      country:string;
      sunrise:string;
      sunset:string;
   };

   id:string;
   name:string;
   cod:string;
}

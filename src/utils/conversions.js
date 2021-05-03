import proj4 from "proj4";

//proj4.defs(["EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"]);
/*proj4.defs(
  [
    "EPSG:4326",
    "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees",
  ],
  [
    "EPSG:2180",
    "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs",
  ]
);*/

export function ArrayToWKT(arr) {
  arr = ArrayCoordConversion(arr, "fist", "second");
  let wkt = "MULTIPOLYGON (((";
  arr.map((m) => {
    wkt = wkt + m[0] + " " + m[1] + ",";
  });
  wkt = wkt + arr[0][0] + " " + arr[0][1] + ")))";
  return wkt;
}

export function ArrayCoordConversion(arr, insrs, outsrs) {
  proj4.defs(
    "EPSG:2180",
    'PROJCS["ETRS89 / Poland CS92",GEOGCS["ETRS89",DATUM["European_Terrestrial_Reference_System_1989",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6258"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4258"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",19],PARAMETER["scale_factor",0.9993],PARAMETER["false_easting",500000],PARAMETER["false_northing",-5300000],AUTHORITY["EPSG","2180"],AXIS["y",EAST],AXIS["x",NORTH]]'
  );
  let new_arr = [];
  arr.map((m) => {
    new_arr.push(proj4(proj4("WGS84"), proj4("EPSG:2180"), [m[1], m[0]]));
    //console.log(m);
  });
  console.log(new_arr);
  return new_arr;
}

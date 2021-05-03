import { useEffect } from "react";
import { useMap } from "react-leaflet";
import chroma from "chroma-js";

//import { parseGeoraster } from "georaster";
//import { GeoRasterLayer } from "georaster-layer-for-leaflet";
var parse_georaster = require("georaster");
var GeoRasterLayer = require("georaster-layer-for-leaflet");

console.log(chroma.brewer);
let scale = chroma.scale("Spectral").domain([1, 0]);

const ReactLeafletRaster = (props) => {
  const map = useMap();
  console.log(props.url);

  function getRaster(url) {
    fetch(url)
      .then((response) => response.arrayBuffer())

      .then((arrayBuffer) => {
        parse_georaster(arrayBuffer).then((georaster) => {
          console.log("georaster:", georaster);
          let min = georaster.mins[0];
          let max = georaster.maxs[0];
          let range = georaster.ranges[0];

          /*
          GeoRasterLayer is an extension of GridLayer,
          which means can use GridLayer options like opacity.

          Just make sure to include the georaster option!

          Optionally set the pixelValuesToColorFn function option to customize
          how values for a pixel are translated to a color.

          http://leafletjs.com/reference-1.2.0.html#gridlayer
      */

          var layer = new GeoRasterLayer({
            georaster: georaster,
            opacity: 0.86,
            pixelValuesToColorFn: (values) => {
              let scaledPixelValue = (values[1] - 0) / 25;
              let color = scale(scaledPixelValue).hex();
              if (values[1] === -9999) return 0;
              else return color;
            },

            //  values[0] === 42 ? "#ffffff" : "#000000",
            resolution: 64, // optional parameter for adjusting display resolution
          });
          layer.addTo(map);

          map.fitBounds(layer.getBounds());
        });
      });
  }

  getRaster(props.url);
  //fetch(url)
  //  .then((response) => response.arrayBuffer())

  //  .then((arrayBuffer) => {
  //    console.log(arrayBuffer); //parse_georaster(arrayBuffer);
  //.then((georaster) => {
  //   console.log("georaster:", georaster);
  //let min = georaster.mins[0];
  //let max = georaster.maxs[0];
  //let range = georaster.ranges[0];

  /*
          GeoRasterLayer is an extension of GridLayer,
          which means can use GridLayer options like opacity.

          Just make sure to include the georaster option!

          Optionally set the pixelValuesToColorFn function option to customize
          how values for a pixel are translated to a color.

          http://leafletjs.com/reference-1.2.0.html#gridlayer
      */
  /*
        var layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 0.86,
          pixelValuesToColorFn: (values) => {
            let scaledPixelValue = (values[1] - 0) / 25;
            let color = scale(scaledPixelValue).hex();
            if (values[1] === -9999) return 0;
            else return color;
          },

          //  values[0] === 42 ? "#ffffff" : "#000000",
          resolution: 64, // optional parameter for adjusting display resolution
        });
        layer.addTo(map);

        map.fitBounds(layer.getBounds());*/
  //});
  // });
  /*
          GeoRasterLayer is an extension of GridLayer,
          which means can use GridLayer options like opacity.

          Just make sure to include the georaster option!

          Optionally set the pixelValuesToColorFn function option to customize
          how values for a pixel are translated to a color.

          http://leafletjs.com/reference-1.2.0.html#gridlayer
      */

  //  });
  return null;
};

export default ReactLeafletRaster;

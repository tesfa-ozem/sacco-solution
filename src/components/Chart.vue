<template>
  <div class="control-section">
    <div>
      <ejs-accumulationchart
        background='transparent'
        align="center"
        id="chartcontainer"
        :title="title"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :chartArea="chartArea"
        :legendSettings="legendSettings"
        :tooltip="tooltip"
      >
        <e-accumulation-series-collection>
          <e-accumulation-series
            :dataSource="chartData.length==0?seriesData:chartData"
            radius="70%"
            xName="x"
            yName="y"
            startAngle="0"
            :dataLabel="dataLabel"
            endAngle="360"
            innerRadius="40%"
            name="Project"
            explode="true"
            explodeOffset="10%"
            :explodeIndex="explodeIndex"
          ></e-accumulation-series>
        </e-accumulation-series-collection>
      </ejs-accumulationchart>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Browser } from "@syncfusion/ej2-base";
import {
  AccumulationChartPlugin,
  PieSeries,
  AccumulationLegend,
  AccumulationDataLabel,
  AccumulationTooltip
} from "@syncfusion/ej2-vue-charts";
Vue.use(AccumulationChartPlugin);
let selectedTheme = location.hash.split("/")[1];
selectedTheme = selectedTheme ? selectedTheme : "Fabric";
const theme = (
  selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
).replace(/-dark/i, "Dark");
export default Vue.extend({
  data: function() {
    return {
      theme: theme,
      seriesData: [
        { x: "Principal", y: 18, text: "18%" },
        { x: "Intrest", y: 8, text: "8%" },
        { x: "Charges", y: 15, text: "15%" },
      ],

      //Initializing Primary X Axis
      primaryXAxis: {
        title: "Years",
        interval: Browser.isDevice ? 2 : 1,
        labelIntersectAction: "Rotate45",
        valueType: "Category",
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        lineStyle: { width: 0 }
      },

      //Initializing Primary Y Axis
      primaryYAxis: {
        title: "Growth",
        minimum: -3,
        maximum: 3,
        interval: 1,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        labelFormat: "{value}B"
      },
      chartArea: {
        background: "#000"
      },
     
      dataLabel: {
        visible: true,
        name: "text",
        position: "Inside",
        font: {
          fontWeight: "600",
          color: "#ffffff"
        }
      },
      legendSettings: {
        visible: false,
        position: "Top"
      },
      tooltip: { enable: true },

      explodeIndex: 3,
      title: "Loan Breakdown"
    };
  },
  props:['chartData']
      
  ,
  provide: {
    accumulationchart: [
      AccumulationLegend,
      PieSeries,
      AccumulationTooltip,
      AccumulationDataLabel
    ]
  },
  methods: {}
});
</script>
<style lang="scss" scoped>
.control-section {
  width: 400px;
  background-color: transparent;
  height: 400px;
}
rect#chartcontainer_boarder{
    fill: #000 !important;
    background-color:  #000 !important;
}

</style>
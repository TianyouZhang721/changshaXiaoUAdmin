<template>
    <div>
        <!-- 创建一个有宽高的容器 -->
        <div ref="main"
             id="main"
             style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    mounted () {
        // 基于准备好的dom，初始化echarts实例
        let myechart = echarts.init(this.$refs.main)

        var option = {
            title: {
                text: 'ECharts 入门示例',
                // textStyle: {
                //     color: "#f00",
                //     fontStyle: "italic",
                //     fontSize: 38,
                //     textBorderColor: "#00f",
                //     textBorderWidth: 5
                // }
            },
            tooltip: {
                triggerOn: "click"
            },
            legend: {
                data: ['销量', "价格"]
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {}, // 必填
            series: [{
                name: '销量',
                type: 'radar',
                data: [5, 20, 98, 10, 10, 20]
            },{
                name: "价格",
                type: "radar",
                data: [10, 50, 30, 80, 5, 6]
            }]

        };
        myechart.setOption(option)
    }
}
</script>

<style lang="stylus" scoped></style>
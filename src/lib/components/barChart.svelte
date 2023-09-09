<script lang="ts">
    import { scaleLinear, scaleBand } from 'd3';
    import { flip } from 'svelte/animate';
    import {onMount} from "svelte";

    const marginTop = 20; // top margin, in pixels
    const marginRight = 0; // right margin, in pixels
    const marginBottom = 30; // bottom margin, in pixels
    const marginLeft = 75; // left margin, in pixels
    const width = 600; // width of the chart, in pixels
    const height = 300; // height of the chart, in pixels
    const xPadding = 0.2; // padding between bars
    const yFormat = 'Books'; // unit to display on y-axis ticks
    const yLabel = '↑ Number of Books'; // label for the y-axis
    const color = 'steelblue'; // bar fill color
    const yScalefactor = 6; // number of ticks on y-yaxis

    // Sort data by default, ascending, or descending
    export let data;
    let sortedData = data;
    function handleReactiveShowSort(input) {
        if (input === 0) {
            return (sortedData = data.sort((a, b) => a[y] - b[y]));
        }
        if (input === 1) {
            return (sortedData = data.sort((a, b) => b[y] - a[y]));
        }
        if (input === 2) {
            const first = data.filter((item) => {return item.pages === '<300'})
            const second = data.filter((item) => {return item.pages === '300-500'})
            const third = data.filter((item) => {return item.pages === '500<'})
            return (sortedData = [first[0], second[0], third[0]]);
        }
        if (input === 3) {
            const first = data.filter((item) => {return item.pages === '500<'})
            const second = data.filter((item) => {return item.pages === '300-500'})
            const third = data.filter((item) => {return item.pages === '<300'})
            return (sortedData = [first[0], second[0], third[0]]);
        }
    }

    $: reactiveShowSort = (input): void => {
        handleReactiveShowSort(input)
    }

    onMount(() => {
        handleReactiveShowSort(0)
    })

    let showTooltip: boolean = false

    function handleShowToolTip(bookNumber: number, show: boolean) {
        if(show) {
            showTooltip = true
            console.log("showing")
            console.log("idx", bookNumber)
        } else {
            showTooltip = false
            console.log("not showing")
        }
    }
    // Compute values X and Y value of Arrays
    const x = Object.keys(data[0])[0]; // given d in data, returns the (ordinal) x-value
    const y = Object.keys(data[0])[1]; // given d in data, returns the (quantitative) y-value
    $: reactiveXVals = sortedData.map((el) => el[x]);
    $: reactiveYVals = sortedData.map((el) => el[y]);

    // Compute default domains, and unique the x-domain.
    $: reactiveXDomain = reactiveXVals; // an array of (ordinal) x-values // sort by descending frequency
    $: reactiveYDomain = [0, Math.max(...reactiveYVals)]; // [ymin, ymax]

    // Construct scales, axes, and formats.
    const xRange = [marginLeft, width - marginRight]; // [left, right]
    const yRange = [height - marginBottom, marginTop * 2]; // [bottom, top]
    $: reactiveXScale = scaleBand(reactiveXDomain, xRange).padding(xPadding);
    $: reactiveYScale = scaleLinear(reactiveYDomain, yRange).nice();

    $: reactiveYTicks = reactiveYScale.ticks(yScalefactor);
    $: reactiveYTicksFormatted = reactiveYTicks.map((el) => el.toLocaleString("en-US"));
</script>

<div class="chart-container bg-white p-4 rounded-2xl" dir="auto">
    <div class="mb-2 text-right">
        <select class="dropdown" on:change={reactiveShowSort(this.selectedIndex)}>
            <option selected>{y} &#8593;</option>
            <option>{y} &#8595;</option>
            <option>{x} &#8593;</option>
            <option>{x} &#8595;</option>
        </select>
    </div>

    <div class="w-full flex flex-col items-center">
        <svg {width} {height} viewBox="0 0 {width} {height}">
            <g class="x-axis" transform="translate(0,{height - marginBottom})">
                <path class="domain" stroke="black" d="M{marginLeft}, 0.5 H{width}" />
                {#each reactiveXVals as xVal, i}
                    <g class="tick" opacity="1" transform="translate({reactiveXScale(xVal)},0)">
                        <line
                                x1={reactiveXScale.bandwidth() / 2}
                                x2={reactiveXScale.bandwidth() / 2}
                                stroke="black"
                                y2="6"
                        />
                        <text y={marginBottom} dx={reactiveXScale.bandwidth() / 4}>{xVal}</text>
                    </g>
                {/each}
            </g>

            <g class="y-axis" transform="translate({marginLeft}, 0)">
                {#each reactiveYTicks as tick, i}
                    <g class="tick" opacity="1" transform="translate(0, {reactiveYScale(tick)})">
                        <line class="tick-start" stroke="black" stroke-opacity="1" x2="-6" />
                        <line class="tick-grid" x2={width - marginLeft - marginRight} />
                        <text x={-marginLeft} y="5">{yFormat === "%" ? reactiveYTicksFormatted[i] * 100 + yFormat : reactiveYTicksFormatted[i] + ' ' + yFormat}</text>
                    </g>
                {/each}
                <text x="{45}" y={marginTop}>{yLabel}</text>
            </g>

            <g class="bars">
                {#each reactiveYVals as bar, i (`${i}-${bar}`)}
                    <rect on:mouseenter={() => {handleShowToolTip(reactiveYVals[i], true)}} on:mouseleave={() => {handleShowToolTip(reactiveYVals[i], false)}}
                          x={reactiveXScale(reactiveXVals[i])}
                          y={reactiveYScale(reactiveYVals[i])}
                          width={reactiveXScale.bandwidth()}
                          height={reactiveYScale(0) - reactiveYScale(bar)}
                          fill={color}
                          animate:flip="{{duration: 1000}}"
                    />
                {/each}
            </g>
        </svg>
    </div>
</div>

<style>
    svg {
        max-width: 100%;
        max-height: 100%;
    }

    .bars rect {
        fill: var(--secondary);
    }

    .bars rect:hover {
        fill: var(--secondary--accent-2);
    }

    .y-axis {
        font-size: 14px;
        font-family: sans-serif;
        text-anchor: end;
    }

    .x-axis {
        font-size: 14px;
        font-family: sans-serif;
        text-anchor: end;
    }

    .tick {
        opacity: 1;
    }

    .tick-start {
        stroke: black;
        stroke-opacity: 1;
    }

    .tick-grid {
        stroke: black;
        stroke-opacity: 0.2;
        font-size: 11px;
        color: black;
    }

    .tick text {
        fill: black;
        text-anchor: start;
    }
</style>
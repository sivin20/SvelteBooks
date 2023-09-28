<script lang="ts">
    import { scaleLinear, scaleBand } from 'd3';
    import { flip } from 'svelte/animate';
    import {onMount} from "svelte";
    import type {BookListItemForBarChart} from "$lib/models/BookListItemForBarChart";
    import {loggedInUser} from "$lib/stores/userStore";

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
    export let bookListForBarChart: BookListItemForBarChart[];
    let sortedData = bookListForBarChart;
    function handleReactiveShowSort(input) {
        if (input === 0) {
            return (sortedData = bookListForBarChart.sort((a, b) => a[y] - b[y]));
        }
        if (input === 1) {
            return (sortedData = bookListForBarChart.sort((a, b) => b[y] - a[y]));
        }
        if (input === 2) {
            const first = bookListForBarChart.filter((item) => {return item.pages === '<300'})
            const second = bookListForBarChart.filter((item) => {return item.pages === '300-500'})
            const third = bookListForBarChart.filter((item) => {return item.pages === '500<'})
            return (sortedData = [first[0], second[0], third[0]]);
        }
        if (input === 3) {
            const first = bookListForBarChart.filter((item) => {return item.pages === '500<'})
            const second = bookListForBarChart.filter((item) => {return item.pages === '300-500'})
            const third = bookListForBarChart.filter((item) => {return item.pages === '<300'})
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
    let tooltipValue: number

    function handleShowToolTip(bookNumber: number, show: boolean) {
        if(show) {
            showTooltip = true
            tooltipValue = bookNumber
        } else {
            showTooltip = false
        }
    }
    // Compute values X and Y value of Arrays
    const x = Object.keys(bookListForBarChart[0])[0]; // given d in data, returns the (ordinal) x-value
    const y = Object.keys(bookListForBarChart[0])[1]; // given d in data, returns the (quantitative) y-value
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

<div class="items-center chart-grid">
    <div class="chart-container bg-transparent rounded-2xl relative w-full z-10" dir="auto">
        <div class="w-full flex flex-col items-center mt-6">
            {#if !!bookListForBarChart[0].books || !!bookListForBarChart[1].books || !!bookListForBarChart[2].books}
                <svg {width} viewBox="0 0 {width} {height}">
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
                            <rect on:mouseenter={() => {handleShowToolTip(reactiveYVals[i], true)}}
                                  on:mouseleave={() => {handleShowToolTip(reactiveYVals[i], false)}}
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
                {#if showTooltip}
                    <div class="absolute top-0 bg-[--secondary--accent-2] px-2 rounded-md font-bold">{tooltipValue}</div>
                {/if}
            {:else}
                <p>No books read yet :(</p>
            {/if}

        </div>
    </div>
    <div class="w-full z-10 xl:h-[300px] flex flex-col justify-between items-center p-0 xl:p-4 grid-text gap-4">
        <div class="flex flex-col flex-auto justify-center items-center">
            <div class="bg-[--secondary--accent-2] h-[42px] w-full flex items-center justify-center rounded-[6px]">
                <p class="text-[25px] font-bold">Monitor your reading</p>
            </div>
            {#if $loggedInUser.reading_speed}
                <p class="pt-4 text-center w-5/6">Track your book count, pages read, and time spent immersed in your reads.
                    Time calculations are based on an average of 300 words per page and your reading speed of <u title="Change reading speed here"><a href="/dashboard/user" >{$loggedInUser.reading_speed} words pr. minute.</a></u></p>
            {:else}
                <p class="pt-4 text-center w-5/6">Track your book count, pages read, and time spent immersed in your reads.
                    Time calculations are based on an average of 300 words per page and a default reading speed set at 250 words per minute,
                    which can be <u title="Change reading speed here"><a href="/dashboard/user">customized</a></u> to reflect your own pace.</p>
            {/if}
        </div>
        {#if  !!bookListForBarChart[0].books && !!bookListForBarChart[1].books && !!bookListForBarChart[2].books}
            <div class="self-end xl:self-start">
                <select class="dropdown" on:change={reactiveShowSort(this.selectedIndex)}>
                    <option selected>{y} &#8593;</option>
                    <option>{y} &#8595;</option>
                    <option>{x} &#8593;</option>
                    <option>{x} &#8595;</option>
                </select>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .chart-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "chart text";

        .chart-container {
            grid-area: chart;
        }

      .grid-text {
        grid-area: text;
      }
    }

    @media only screen and (max-width: 1280px) {
      .chart-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas:
            "text"
            "chart";
      }
    }

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
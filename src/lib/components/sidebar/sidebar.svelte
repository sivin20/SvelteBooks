<script>
    import '../../../app.css';
    import Fa from 'svelte-fa'
    import { faHome, faBookMedical, faRightFromBracket, faFolder } from '@fortawesome/free-solid-svg-icons'
    import {page} from '$app/stores'
    import { Logo } from '$lib/assets/siglib_blue_white.svg'

    $: console.log($page.url.pathname)
</script>

<aside class="absolute fixed left-0 top-0 w-22 h-full flex flex-col bg-[--primary]">
    <div class="flex items-center flex-col text-white h-full w-full text-[32px]">
        <div class="flex flex-col justify-between h-full w-full items-center">
            <div class="flex items-center flex-col text-white w-full">
                <a href="/dashboard" class="mt-10 mb-14">
                    <img src="{Logo}" alt="logo">
                </a>
                <a href="/dashboard" class="h-1/5 w-full flex flex-col justify-center items-center h-24">
                    <div class="flex justify-center items-center nav-item"
                         class:active={$page.url.pathname === '/dashboard'}>
                        <Fa icon="{faHome}"></Fa>
                    </div>
                </a>
                <a href="/dashboard/library" class="h-1/5 w-full flex flex-col justify-center items-center h-24">
                    <div class="flex justify-center items-center nav-item"
                         class:active={$page.url.pathname === '/dashboard/library'}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28.028" height="33.021" viewBox="0 0 28.028 33.021">
                            <defs>
                                <clipPath id="clip-path">
                                    <rect id="Rectangle_9" data-name="Rectangle 9" width="28.028" height="33.021"/>
                                </clipPath>
                            </defs>
                            <g id="Group_2" data-name="Group 2" transform="translate(0 0)">
                                <g id="Group_1" data-name="Group 1" transform="translate(0 0)" clip-path="url(#clip-path)">
                                    <path id="Path_1" data-name="Path 1" d="M10.874,31.355a8.115,8.115,0,0,1-2.325-.727,3.746,3.746,0,0,1-2.1-2.5,2.512,2.512,0,0,1-.043-.544q0-7.943,0-15.886A3.979,3.979,0,0,1,7.937,8.561C8.89,7.754,9.956,7.1,10.977,6.39,12.545,5.3,14.125,4.22,15.7,3.141a1.33,1.33,0,0,1,1.645-.068,1.157,1.157,0,0,1,.5.8,9.31,9.31,0,0,1,.014,2.247,1.285,1.285,0,0,1-2.334.576c-.113-.162-.189-.148-.331-.049C13.485,7.832,11.77,9.013,10.059,10.2a3.45,3.45,0,0,0-.762.691,1.459,1.459,0,0,0-.247,1.252,1.025,1.025,0,0,0,1.069.759,5.535,5.535,0,0,0,2.858-.765,17.714,17.714,0,0,0,2.242-1.51c2.256-1.663,4.466-3.386,6.686-5.1a1.748,1.748,0,0,1,.856-.418A1.283,1.283,0,0,1,24.23,6.368c.018.8.006,1.59.006,2.385q0,6.96.006,13.919a1.571,1.571,0,0,1-.659,1.352c-2.636,2.014-5.26,4.046-7.941,6a6.841,6.841,0,0,1-2.964,1.329Zm4.468-13.176c0,.312,0,.622,0,.934,0,.081-.041.191.048.235s.15-.059.213-.108q2.9-2.246,5.8-4.492a.525.525,0,0,0,.22-.466c-.01-.6,0-1.2-.006-1.8,0-.089.049-.216-.064-.258-.083-.03-.148.072-.213.123-1.7,1.314-3.372,2.657-5.1,3.928-.684.5-1.141,1.014-.9,1.906" transform="translate(3.785 1.666)"/>
                                    <path id="Path_2" data-name="Path 2" d="M.01,16.462c0-2.589-.01-5.176,0-7.765A4.223,4.223,0,0,1,2.075,4.92Q5.722,2.638,9.332.3a1.319,1.319,0,0,1,1.936.251,1.45,1.45,0,0,1,.247.819c0,.57.008,1.139,0,1.709a1.289,1.289,0,0,1-.931,1.286A1.266,1.266,0,0,1,9.124,3.83c-.123-.178-.21-.154-.36-.059q-2.678,1.7-5.36,3.4a1.662,1.662,0,0,0-.77,1.6c.03.689.449.991,1.162.889a6.174,6.174,0,0,0,2.229-.8c1.451-.839,2.837-1.78,4.237-2.7,1.8-1.177,3.585-2.368,5.375-3.553a1.409,1.409,0,0,1,1.392-.25,1.4,1.4,0,0,1,.45,2.255,2.923,2.923,0,0,1-.457.355C15.016,6.309,13,7.639,11,9a4.6,4.6,0,0,0-1.936,3.421,21.674,21.674,0,0,0-.126,2.764q0,5.446,0,10.89a1.351,1.351,0,0,1-1.169,1.562A8.171,8.171,0,0,1,1.68,27.02,3,3,0,0,1,0,24.129c.032-2.555.01-5.112.01-7.668" transform="translate(0 -0.001)"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                </a>
                <a href="/dashboard/library/add-book" class="h-1/5 w-full flex flex-col justify-center items-center h-24">
                    <div class="flex justify-center items-center nav-item"
                         class:active={$page.url.pathname === '/dashboard/library/add-book'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25.192" height="28.788" viewBox="0 0 25.192 28.788">
                            <path id="Path_4" data-name="Path 4" d="M25.182,20.15V1.444A1.324,1.324,0,0,0,23.744,0H5.4A5.3,5.3,0,0,0,0,5.2c0,.067,0,.135,0,.2V23.388a5.3,5.3,0,0,0,5.2,5.4q.1,0,.2,0H23.744a1.418,1.418,0,0,0,1.439-1.4c0-.014,0-.028,0-.042v-.9a1.554,1.554,0,0,0-.54-1.079,15.921,15.921,0,0,1,0-4.137,1.088,1.088,0,0,0,.54-1.08ZM8.1,9.448A.45.45,0,0,1,8.544,9H11.7V5.85a.45.45,0,0,1,.45-.45h2.7a.45.45,0,0,1,.45.45V9h3.148a.45.45,0,0,1,.45.45v2.7a.45.45,0,0,1-.45.45H15.294v3.148a.45.45,0,0,1-.45.45h-2.7a.45.45,0,0,1-.45-.45V12.6H8.544a.45.45,0,0,1-.45-.45Zm15,15.739H5.4a1.7,1.7,0,0,1-1.8-1.8,1.8,1.8,0,0,1,1.8-1.8H23.1Z"
                                  transform="translate(0.001 0.001)"/>
                        </svg>
                    </div>
                </a>
                <a href="#" class="h-1/5 w-full flex flex-col justify-center items-center h-24">
                    <div class="flex justify-center items-center nav-item"
                         class:active={$page.url.pathname === '#'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36.06" height="36.06" viewBox="0 0 36.06 36.06">
                            <path id="Icon_awesome-user-circle" data-name="Icon awesome-user-circle" d="M18.03.562a18.03,18.03,0,1,0,18.03,18.03A18.027,18.027,0,0,0,18.03.562Zm0,6.979a6.4,6.4,0,1,1-6.4,6.4A6.4,6.4,0,0,1,18.03,7.542Zm0,25.009A13.932,13.932,0,0,1,7.379,27.593a8.106,8.106,0,0,1,7.161-4.348,1.779,1.779,0,0,1,.516.08,9.626,9.626,0,0,0,2.973.5,9.589,9.589,0,0,0,2.973-.5,1.779,1.779,0,0,1,.516-.08,8.106,8.106,0,0,1,7.161,4.348A13.932,13.932,0,0,1,18.03,32.551Z" transform="translate(0 -0.563)"/>
                        </svg>
                    </div>
                </a>
            </div>
            <div class="arrow-up">
            </div>
        </div>
    </div>
</aside>

<style lang="scss">
    .arrow-up {
      width: 0;
      height: 0;
      border-left: 45px solid transparent;
      border-right: 45px solid transparent;

      border-bottom: 40px solid #FFF;
    }

    svg {
      fill: var(--background-primary)
    }

    .active {
        background-color: var(--background-primary);
        border-radius: 6px;
        height: 52px;
        width: 52px;
        color: var(--primary);
        svg {
          fill: var(--primary) !important;
        }
    }

    a:hover .nav-item {
        background-color: var(--background-primary);
        border-radius: 6px;
        height: 52px;
        width: 52px;

      color: var(--primary);
      svg {
        fill: var(--primary) !important;
      }
    }
</style>
<template>
    <div>

        <div class="kitty-main">
            <span class="stand"></span>
            <el-tooltip class="item" effect="light" content="我在睡觉呢，无聊的话去找蕾姆玩。  ╮(╯▽╰)╭" placement="right-end">
                <div class="cat">
                    <div class="body"></div>
                    <div class="head">
                        <div class="ear"></div>
                        <div class="ear"></div>
                    </div>
                    <div class="face">
                        <div class="nose"></div>
                        <div class="whisker-container">
                            <div class="whisker"></div>
                            <div class="whisker"></div>
                        </div>
                        <div class="whisker-container">
                            <div class="whisker"></div>
                            <div class="whisker"></div>
                        </div>
                    </div>
                    <div class="tail-container">
                        <div class="tail">
                            <div class="tail">
                                <div class="tail">
                                    <div class="tail">
                                        <div class="tail">
                                            <div class="tail">
                                                <div class="tail"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tooltip>

        </div>
</div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    },
    computed: {

    },
}
</script>
<style scoped lang='less'>
@catClolor: #2c3e50;

.kitty-main {
    height: 50px;
    width: 100px;
    position: absolute;
    left: 5px;
    top: -25px;
    transform: scale(-.8, .8);

    .stand {
        position: absolute;
        bottom: 0;
        left: 55px;
        transform: translate(-50%);
        height: 4px;
        width: 80px;
        border-radius: 4px;
        background-color: #3eaf7c;
        z-index: 2;
    }

    .cat {
        width: 55px;
        height: 25px;
        position: absolute;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        right: 0;
        bottom: 3px;

        .body {
            background-color: @catClolor;
            -webkit-animation: body 12s infinite none;
            animation: body 12s infinite none;
            width: 55px;
            height: 25px;
            position: absolute;
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;
        }

        .head {
            content: "";
            width: 35px;
            height: 18px;
            background-color: @catClolor;
            position: absolute;
            top: calc(50% - 5px);
            left: -20px;
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;

            .ear {
                position: absolute;
                left: 4px;
                top: -4px;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 10px solid @catClolor;
                transform: rotate(-30deg);
                -webkit-animation: left-ear 12s infinite both;
                animation: left-ear 12s infinite both;
            }

            .ear+.ear {
                animation: right-ear 12s infinite both;
                top: -6px;
                left: 15px;
            }
        }

        .face {
            .nose {
                position: absolute;
                bottom: 5px;
                left: -5px;
                background-color: #fd6e72;
                height: 3px;
                width: 3px;
                border-radius: 50%;
            }



            .whisker-container {
                position: absolute;
                bottom: 3px;
                left: -19px;
                width: 10px;
                height: 5px;
                transform-origin: right;
                -webkit-animation: left-whisker 12s infinite both;
                animation: left-whisker 12s infinite both;

                .whisker {
                    position: absolute;
                    top: 0;
                    width: 80%;
                    border: 1px solid #fdf9de;
                    transform-origin: 100% 0;
                    transform: rotate(10deg);
                }

                .whisker:last-child {
                    top: 0;
                    transform: rotate(-20deg);
                }
            }

            .whisker-container:nth-child(2) {
                left: -9px;
                bottom: 6px;
                transform-origin: right;
                transform: rotate(180deg);
                -webkit-animation: right-whisker 12s infinite both;
                animation: right-whisker 12s infinite both;
            }
        }

        .tail-container {
            position: absolute;
            right: 0;
            bottom: -7px;
            z-index: 3;

            .tail {
                position: absolute;
                height: 15px;
                width: 6px;
                bottom: -5px;
                right: 0;
                border-bottom-right-radius: 3px;
                background: @catClolor;
                z-index: 0;

                .tail>.tail {
                    -webkit-animation: tail 12s infinite none;
                    animation: tail 12s infinite none;
                    height: 100%;
                    width: 6px;
                    transform-origin: left;
                    border-bottom-left-radius: 10px 10px;
                    border-bottom-right-radius: 10px 10px;
                    border-top-right-radius: 20px;
                }
            }
        }
    }
}

@keyframes tail {
    6.66667% {
        transform: rotate(0);
    }

    10% {
        transform: rotate(10deg);
    }

    16.6667% {
        transform: rotate(-5deg);
    }

    20% {
        transform: rotate(30deg);
    }

    26.6667% {
        transform: rotate(-2deg);
    }

    46.6667% {
        transform: rotate(10deg);
    }

    53.3333% {
        transform: rotate(-5deg);
    }

    56.6667% {
        transform: rotate(10deg);
    }
}

@keyframes right-whisker {
    6.66667% {
        transform: rotate(180deg);
    }

    10% {
        transform: rotate(190deg);
    }

    16.6667% {
        transform: rotate(180deg);
    }

    20% {
        transform: rotate(175deg);
    }

    26.6667% {
        transform: rotate(190deg);
    }

    46.6667% {
        transform: rotate(180deg);
    }

    53.3333% {
        transform: rotate(185deg);
    }

    56.6667% {
        transform: rotate(175deg);
    }
}

@keyframes left-whisker {
    6.66667% {
        transform: rotate(0);
    }

    10% {
        transform: rotate(0deg);
    }

    16.6667% {
        transform: rotate(-5deg);
    }

    20% {
        transform: rotate(0deg);
    }

    26.6667% {
        transform: rotate(0deg);
    }

    46.6667% {
        transform: rotate(10deg);
    }

    53.3333% {
        transform: rotate(-5deg);
    }

    56.6667% {
        transform: rotate(10deg);
    }
}

@keyframes left-ear {
    0% {
        transform: rotate(-20deg);
    }

    6.66667% {
        transform: rotate(-6deg);
    }

    13.3333% {
        transform: rotate(-15deg);
    }

    26.6667% {
        transform: rotate(-15deg);
    }

    33.3333% {
        transform: rotate(-30deg);
    }

    40% {
        transform: rotate(-30deg);
    }

    46.6667% {
        transform: rotate(0deg);
    }

    53.3333% {
        transform: rotate(0deg);
    }

    60% {
        transform: rotate(-15deg);
    }

    80% {
        transform: rotate(-15deg);
    }

    93.3333% {
        transform: rotate(-6deg);
    }

    100% {
        transform: rotate(-6deg);
    }
}

@keyframes right-ear {
    0% {
        transform: rotate(-16deg);
    }

    6.66667% {
        transform: rotate(-16deg);
    }

    13.3333% {
        transform: rotate(-19deg);
    }

    26.6667% {
        transform: rotate(-19deg);
    }

    33.3333% {
        transform: rotate(-30deg);
    }

    36.6667% {
        transform: rotate(-19deg);
    }

    37.3333% {
        transform: rotate(-30deg);
    }

    38% {
        transform: rotate(-19deg);
    }

    40% {
        transform: rotate(-19deg);
    }

    40.6667% {
        transform: rotate(-30deg);
    }

    41.3333% {
        transform: rotate(-19deg);
    }

    46.6667% {
        transform: rotate(-9deg);
    }

    53.3333% {
        transform: rotate(-9deg);
    }

    60% {
        transform: rotate(-19deg);
    }

    60.6667% {
        transform: rotate(-30deg);
    }

    61.3333% {
        transform: rotate(-19deg);
    }

    62.6667% {
        transform: rotate(-19deg);
    }

    63.3333% {
        transform: rotate(-30deg);
    }

    64% {
        transform: rotate(-19deg);
    }

    80% {
        transform: rotate(-19deg);
    }

    93.3333% {
        transform: rotate(-16deg);
    }

    100% {
        transform: rotate(-16deg);
    }
}

@keyframes body {
    6.66667% {
        transform: scaleY(1);
    }

    10% {
        transform: scaleY(1.15);
    }

    16.6667% {
        transform: scaleY(1);
    }

    20% {
        transform: scaleY(1.25);
    }

    26.6667% {
        transform: scaleY(1);
    }

    46.6667% {
        transform: scaleY(1.15);
    }

    53.3333% {
        transform: scaleY(1);
    }

    56.6667% {
        transform: scaleY(1.15);
    }
}
</style>

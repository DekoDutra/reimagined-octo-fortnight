<template>
    <div class="error ">
        <div class="center">
            <fa icon="frown" />
            <h1>Error 404</h1>
            A página solicitada não foi encontrada!
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .error {
        background: #26759B;
        height: 100vh;

        svg {
            font-size: 20em;
            position: absolute;
            z-index: -9;
            color: rgba(0,0,0,0.2);
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .center {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40%;
            transform: translate(-50%,-50%);
            text-align: center;
            color: #ffffff;
            h1 {
                font-size: 60px;
                font-weight: bold;
            }
        }
    }
</style>

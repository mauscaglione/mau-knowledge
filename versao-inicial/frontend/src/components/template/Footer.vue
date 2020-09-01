<template>
  <footer class="footer">
      <span><strong>Cod3r</strong> 2015-2020 </span>
  </footer>
</template>

<script>
export default {
    name: 'Footer',
    data: function (){
        //todos componentes possuem um "estado".
        return {

        }
    }
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;

    }
</style>
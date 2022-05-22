<template>
  <div class="user">
    <h1>This is {{ $route.params.username }}'s page</h1>
  </div>
</template>

<script>
export default {
  props: ['username'],
}
</script>

<style></style>

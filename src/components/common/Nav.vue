<template>
    <div>
        <Header></Header>
        <Sidebar></Sidebar>
    </div>
</template>
<script>
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
export default {
    components: {
        Sidebar, Header
    }
}
</script>

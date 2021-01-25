<template lang="html">
    <div class="admin-panel">
        <AdminHeader></AdminHeader>
        <router-view/>
    </div>
</template>

<script>
import AdminHeader from "../components/Admin/AdminHeader"
export default {
    components: {
        AdminHeader
    }
}
</script>

<style lang="css" scoped>

</style>

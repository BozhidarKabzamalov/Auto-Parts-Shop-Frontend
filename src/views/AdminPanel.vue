<template lang="html">
    <div class="admin-panel">
        <AdminHeader></AdminHeader>
        <div class="wrapper">
            <router-view/>
        </div>
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

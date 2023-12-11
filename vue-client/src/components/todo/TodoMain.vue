<script setup lang="ts">
</script>

<template>
    <div class="wrapper">
        <md-tabs style="width: 100%; max-width: 720px;">
            <md-primary-tab>Birds</md-primary-tab>
            <md-primary-tab>Cats</md-primary-tab>
            <md-primary-tab>Dogs</md-primary-tab>
        </md-tabs>
        <md-list style="width: 100%;">
            <md-list-item interactive>
                <div slot="start"><md-checkbox touch-target="wrapper"></md-checkbox></div>
                Apple
            </md-list-item>
            <md-list-item interactive>
                <div slot="start"><md-checkbox touch-target="wrapper"></md-checkbox></div>
                Banana
            </md-list-item>
            <md-list-item interactive>
                <div slot="start"><md-checkbox touch-target="wrapper"></md-checkbox></div>
                <div slot="headline">Cucumber</div>
                <div slot="supporting-text">Cucumbers are long green fruits that are just as long as this multi-line
                    description</div>
            </md-list-item>
            <md-list-item interactive>
                <div slot="start"><md-checkbox touch-target="wrapper"></md-checkbox></div>
                <div slot="headline">Shop for Kiwis</div>
                <div slot="supporting-text">This will link you out in a new tab</div>
            </md-list-item>
        </md-list>
    </div>
</template>

<style scoped>
.wrapper {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--md-sys-color-outline);
    border-radius: 16px;
    overflow: hidden;
}
</style>

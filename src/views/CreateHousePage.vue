<template>
  <page-layout>
    <section class="py-4 bg-teal-dark">
      <div class="container">
        <form class="form">
          <div class="form__field relative">
            <i class="input-icon material-icons absolute text-grey-darker">search</i>
            <input
              class="input__search"
              id="where"
              type="text"
              placeholder="Mexico City, Mexico">
          </div>
        </form>
      </div>
    </section>

    <section class="section__create py-6">
      <div class="container">
        <h1 class="text-3xl">Publish new room</h1>
        <form>
          <div class="mb-4">
            <label for="title" class="input__label">Title</label>
            <input v-model="publication.title" type="text" name="title" placeholder="Bruce Wayne" class="input__field">
          </div>
          <div class="mb-4">
            <label class="input__label">Description</label>
            <textarea v-model="publication.description" class="input__field" cols="30" rows="10"></textarea>
          </div>
          <div class="mb-4">
            <label for="featuredImage" class="input__label">Featured Image</label>
            <input v-model="publication.featuredImage" type="text" name="featuredImage" placeholder="http://image-url" class="input__field">
          </div>
          <div class="mb-4b text-right">
            <button @click.prevent="sendPublication" class="w-full bg-yellow-dark text-yellow-darker font-semibold py-6 rounded">Publish</button>
          </div>
        </form>
      </div>
    </section>

  </page-layout>
</template>
<script>
import PageLayout from '@/layouts/PageLayout.vue'

export default {
  name: 'CreateHousePage',
  components: {
    PageLayout
  },
  data () {
    return {
      publication: {
        title: '',
        description: '',
        featuredImage: ''
      }
    }
  },
  methods: {
    sendPublication () {
      const { title, description, featuredImage } = this.publication
      const newPublication = {
        title,
        description,
        featured_image: featuredImage,
        publishedAt: Math.floor(Date.now() / 1000)
      }

      this.$store.dispatch('createNewRoom', newPublication)
      .then(() => this.$router.push({ name: 'HomePage' }))
    }
  }
}
</script>

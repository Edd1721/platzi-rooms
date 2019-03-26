<script>
export default {
  name: 'HolaMundo',
  props: {
    msg: {
      type: String,
      required: true,
      validator: (value) => {
        return value.length > 5
      }
    }
  },
  render () {
    return <p>{ this.msg }</p>
  }
}
</script>

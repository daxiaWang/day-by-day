const debounce = {
  inserted: function(el, binding) {
    let timer
    console.log('timer', timer)
    el.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  }
}

export default debounce

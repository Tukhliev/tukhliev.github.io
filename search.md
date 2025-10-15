---
layout: page
title: Qidirish
---
<input type="text" id="search-input" placeholder="Qidirish...">
<ul id="results-container"></ul>

<script src="/assets/js/lunr.js"></script>
<script>
  var idx = lunr(function () {
    this.ref('url')
    this.field('title')
    this.field('content')
    this.field('category')
    this.field('tags')

    fetch('/search.json')
      .then(response => response.json())
      .then(documents => {
        documents.forEach(doc => this.add(doc))
      })
  })

  document.getElementById('search-input').addEventListener('keyup', function() {
    var query = this.value
    var results = idx.search(query)
    var container = document.getElementById('results-container')
    container.innerHTML = ''
    results.forEach(result => {
      var item = document.createElement('li')
      item.innerHTML = '<a href="' + result.ref + '">' + result.ref + '</a>'
      container.appendChild(item)
    })
  })
</script>

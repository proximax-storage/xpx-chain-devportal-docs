---
id: endpoints
title: Endpoints
---

<link href="../static/css/api.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/redoc@2.0.0-alpha.41/bundles/redoc.standalone.js"></script>

<div id="redoc"></div>

<script>
Redoc.init('../../downloads/swagger.yaml', {
      scrollYOffset: '101',
      hideLoading: true,
      suppressWarnings: true,
      theme: {
        "breakpoints": {
            "medium": "4500px",
        },
        spacing: {
          sectionVertical: 15
        }
      }
    }, document.getElementById('redoc'));
</script>

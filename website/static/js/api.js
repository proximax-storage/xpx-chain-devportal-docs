Redoc.init('../downloads/openapi3.yaml', {
  scrollYOffset: '101',
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

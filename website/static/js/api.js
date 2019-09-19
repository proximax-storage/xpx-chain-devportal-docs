Redoc.init('../downloads/swagger.yaml', {
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

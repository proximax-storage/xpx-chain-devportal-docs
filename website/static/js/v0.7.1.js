Redoc.init('/downloads/swagger-v0.7.1.yaml', {
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
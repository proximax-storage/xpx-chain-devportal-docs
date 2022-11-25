Redoc.init('../downloads/swagger-v0.4.2.yaml', {
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
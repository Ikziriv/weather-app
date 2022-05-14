<script>
    export let uv;
    export let quality;
    let burntime = 60;
    if (uv === 1 || uv === 2) {
        uv = "Low";
        burntime = 60;
    } else if (uv === 3 || uv === 4 || uv === 5) {
        uv = "Moderate";
        burntime = 45;
    } else if (uv === 6 || uv === 7) {
        uv = "High";
        burntime = 30;
    } else if (uv === 8 || uv === 9 || uv === 10) {
        uv = "Very High";
        burntime = 15-20;
    }
    switch (quality) {
        case 1:
            quality = "Good";
            break;
        case 2:
            quality = "Moderate";
            break;
        case 3:
            quality = "Ok";
            break;
        case 4:
            quality = "Unhealthy";
            break;
        case 5:
            quality = "Very Unhealthy";
            break;
        case 6:
            quality = "Hazardous";
            break;
    }
</script>

<div class="air gradient">
    <div class="sunrise">
        <img src="/ui/uv.svg" alt="uv">
        <p>UV index: {uv}</p>
        <p style="margin-top: -.5rem;">Burn time: {burntime} <em>Minutes</em></p>
    </div>
    <div class="sunset">
        <img src="/ui/air.svg" alt="air quality">
        <p>Air quality: {quality}</p>
    </div>
</div>

<style>
    .air {
        margin: 1rem 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .air img {
        margin-top: .5rem;
        width: 5rem;
    }
    p {
        margin: 0;
        margin-bottom: .5rem;
    }
    em {
        color: var(--accent);
        font-style: normal;
    }
</style>
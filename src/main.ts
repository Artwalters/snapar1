import { bootstrapCameraKit } from "@snap/camera-kit";

(async function () {
    const cameraKit = await bootstrapCameraKit({
        apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI4NDEzMTUyLCJzdWIiOiI2ZTY1NjkyNC1hYzc5LTQ2MDAtOWU1Zi02M2YyZWVhYWI2NjF-U1RBR0lOR344OWI0MGQ4Yi1jOTY0LTQ5OTUtOWFkNC00NThkMGEwNjVhYWEifQ.01jq2pPDI9iXylWl6UCBFWeCT3GzshZpkzCL6CCHo3A'
    });

    const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
    
    // Spiegeling toevoegen via CSS-transformatie
    liveRenderTarget.style.transform = 'scaleX(-1)';

    const session = await cameraKit.createSession({ liveRenderTarget });

    const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'user'
        }
    });


    await session.setSource(mediaStream);
    await session.play();

    const lens = await cameraKit.lensRepository.loadLens('9c456053-460c-4480-a600-0fbc5a97fe84', '8f1e9505-86ad-46eb-8552-ecff9d1be776');
    await session.applyLens(lens);

    // Functie om canvas breedte-hoogte verhouding te handhaven
    const resizeCanvas = () => {
        const aspectRatio = 16 / 9; // Verhouding 16:9
        const container = document.getElementById('container') as HTMLDivElement;
        const canvas = liveRenderTarget;

        // Schaal canvas naar de juiste verhouding op basis van schermgrootte
        if (window.innerWidth / window.innerHeight > aspectRatio) {
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerWidth / aspectRatio}px`;
        } else {
            canvas.style.height = `${window.innerHeight}px`;
            canvas.style.width = `${window.innerHeight * aspectRatio}px`;
        }
    };

    // Event listener voor het aanpassen van de canvas-grootte bij schermresizing
    window.addEventListener('resize', resizeCanvas);

    // Roep het eenmalig aan om de juiste grootte bij het laden in te stellen
    resizeCanvas();
})();


import React, { useState, useRef, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { IdCardPreview } from './components/IdCardPreview';
import { CardConfig, PlayerData, TemplateStyle, CardFormat, PlayerPosition } from './types';
import { CameraCaptureModal } from './components/CameraCaptureModal';
import { Notification } from './components/Notification';
import { isNativePlatform, saveImageToGallery, savePdfToDownloads } from './components/native-file-saver';

declare const html2canvas: any;
declare const jspdf: any;

const App: React.FC = () => {
  const [playerData, setPlayerData] = useState<PlayerData>({
    playerImage: 'https://picsum.photos/200/200',
    fullName: 'JONATHAN DOE',
    dob: '1998-07-21',
    teamName: 'Strikers RFC',
    address: '123 Rugby Road, Sportsville, ST 12345',
    position: PlayerPosition.FULLBACK,
    twitterHandle: '@jonnydoe_rugby',
    instagramHandle: 'jonnydoe.rugby',
  });

  const [cardConfig, setCardConfig] = useState<CardConfig>({
    cardFormat: CardFormat.CR80,
    template: TemplateStyle.A,
    primaryColor: '#002D62', // Navy
    secondaryColor: '#FDBB30', // Gold
  });
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  const handlePlayerDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Only uppercase specific text fields
    const nonUppercasedFields = ['position', 'dob', 'twitterHandle', 'instagramHandle'];
    const newValue = nonUppercasedFields.includes(name) ? value : value.toUpperCase();
    setPlayerData(prev => ({ ...prev, [name]: newValue }));
  };
    
  const handleConfigChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCardConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPlayerData(prev => ({ ...prev, playerImage: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLivePhotoCapture = (imageDataUrl: string) => {
    setPlayerData(prev => ({ ...prev, playerImage: imageDataUrl }));
    setIsCameraOpen(false);
  };

  const exportToJPEG = useCallback(async () => {
    if (!frontCardRef.current || !backCardRef.current) return;

    try {
        const frontCanvas = await html2canvas(frontCardRef.current, { scale: 3, backgroundColor: null });
        const backCanvas = await html2canvas(backCardRef.current, { scale: 3, backgroundColor: null });
        
        const frontFileName = `${playerData.fullName.replace(/ /g,'_')}_ID_Front.jpg`;
        const backFileName = `${playerData.fullName.replace(/ /g,'_')}_ID_Back.jpg`;

        if (isNativePlatform()) {
            try {
                await saveImageToGallery(frontCanvas.toDataURL('image/jpeg', 0.95), frontFileName);
                await saveImageToGallery(backCanvas.toDataURL('image/jpeg', 0.95), backFileName);
                setNotificationMessage('JPEGs saved to device Gallery.');
            } catch (error) {
                console.error("Native save failed:", error);
                setNotificationMessage('Error: Could not save JPEGs.');
            }
        } else {
            const exportCardWeb = (canvas: HTMLCanvasElement, fileName: string) => {
                const link = document.createElement('a');
                link.download = fileName;
                link.href = canvas.toDataURL('image/jpeg', 0.95);
                link.click();
            };
            exportCardWeb(frontCanvas, frontFileName);
            exportCardWeb(backCanvas, backFileName);
            setNotificationMessage('JPEG downloads started. Check your browser downloads.');
        }
    } catch (error) {
        console.error("Canvas generation failed:", error);
        setNotificationMessage('Error: Could not generate images.');
    }

    setTimeout(() => setNotificationMessage(''), 5000);
  }, [playerData.fullName]);

  const exportToPDF = useCallback(async () => {
    if (!frontCardRef.current || !backCardRef.current) return;

    try {
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [frontCardRef.current.offsetHeight * 2 + 60, frontCardRef.current.offsetWidth + 40]
        });

        const frontCanvas = await html2canvas(frontCardRef.current, { scale: 3, backgroundColor: null });
        const backCanvas = await html2canvas(backCardRef.current, { scale: 3, backgroundColor: null });

        const cardWidth = frontCardRef.current.offsetWidth;
        const cardHeight = frontCardRef.current.offsetHeight;

        pdf.addImage(frontCanvas.toDataURL('image/png'), 'PNG', 20, 30, cardWidth, cardHeight);
        pdf.addImage(backCanvas.toDataURL('image/png'), 'PNG', cardWidth + 40, 30, cardWidth, cardHeight);

        const fileName = `${playerData.fullName.replace(/ /g,'_')}_ID_Card.pdf`;

        if (isNativePlatform()) {
            try {
                const pdfDataUri = pdf.output('datauristring');
                await savePdfToDownloads(pdfDataUri, fileName);
                setNotificationMessage('PDF saved to Downloads folder.');
            } catch (error) {
                console.error("Native PDF save failed:", error);
                setNotificationMessage('Error: Could not save PDF.');
            }
        } else {
            pdf.save(fileName);
            setNotificationMessage('PDF download started. Check your browser downloads.');
        }
    } catch (error) {
        console.error("PDF generation failed:", error);
        setNotificationMessage('Error: Could not generate PDF.');
    }
    setTimeout(() => setNotificationMessage(''), 5000);
  }, [playerData.fullName]);


  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col lg:flex-row">
      {isCameraOpen && (
        <CameraCaptureModal
          onCapture={handleLivePhotoCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
      <div 
        className="w-full lg:w-1/3 xl:w-1/4 p-4 lg:p-6 bg-gray-800 shadow-2xl lg:h-screen lg:overflow-y-auto"
        style={{backgroundImage: "url(https://www.transparenttextures.com/patterns/carbon-fibre.png)"}}
      >
        <Sidebar
          playerData={playerData}
          cardConfig={cardConfig}
          onPlayerDataChange={handlePlayerDataChange}
          onConfigChange={handleConfigChange}
          onImageUpload={handleImageUpload}
          onOpenCamera={() => setIsCameraOpen(true)}
          setCardConfig={setCardConfig}
          onExportJPEG={exportToJPEG}
          onExportPDF={exportToPDF}
        />
      </div>
      <div 
        className="w-full lg:w-2/3 xl:w-3/4 flex-grow p-4 lg:p-10 flex items-center justify-center bg-gray-200"
        style={{backgroundImage: "url(https://www.transparenttextures.com/patterns/light-grass.png)"}}
      >
        <IdCardPreview
          playerData={playerData}
          cardConfig={cardConfig}
          frontCardRef={frontCardRef}
          backCardRef={backCardRef}
        />
      </div>
      {notificationMessage && <Notification message={notificationMessage} />}
    </div>
  );
};

export default App;
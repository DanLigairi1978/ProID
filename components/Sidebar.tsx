import React from 'react';
import { CardConfig, PlayerData, TemplateStyle, TemplateColor, PlayerPosition, CardFormat } from '../types';
import { CameraIcon } from './icons/CameraIcon';
import { UploadIcon } from './icons/UploadIcon';
import { JpegIcon } from './icons/JpegIcon';
import { PdfIcon } from './icons/PdfIcon';

interface SidebarProps {
  playerData: PlayerData;
  cardConfig: CardConfig;
  onPlayerDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onConfigChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenCamera: () => void;
  setCardConfig: React.Dispatch<React.SetStateAction<CardConfig>>;
  onExportJPEG: () => void;
  onExportPDF: () => void;
}

const templateColors: TemplateColor[] = [
    { name: 'Navy/Gold', primary: '#002D62', secondary: '#FDBB30', style: TemplateStyle.A },
    { name: 'Teal/White', primary: '#008080', secondary: '#FFFFFF', style: TemplateStyle.B },
    { name: 'Blue/Black', primary: '#00529B', secondary: '#1B1B1B', style: TemplateStyle.C },
    { name: 'Maroon/Silver', primary: '#800000', secondary: '#C0C0C0', style: TemplateStyle.D },
];

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-700/50 rounded-lg p-4 mb-6 shadow-inner">
    <h3 className="font-bebas text-2xl text-gray-300 border-b-2 border-gray-600 pb-2 mb-4 tracking-wider">{title}</h3>
    {children}
  </div>
);

const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }> = ({ label, name, value, onChange, type = "text" }) => (
    <div className="mb-3">
        <label htmlFor={name} className="block text-sm font-bold text-gray-400 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-900 text-white rounded-md border-2 border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 px-3 py-2 transition duration-200"
        />
    </div>
);

export const Sidebar: React.FC<SidebarProps> = ({
  playerData,
  cardConfig,
  onPlayerDataChange,
  onConfigChange,
  onImageUpload,
  onOpenCamera,
  setCardConfig,
  onExportJPEG,
  onExportPDF,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleTemplateChange = (style: TemplateStyle) => {
      const colors = templateColors.find(c => c.style === style);
      setCardConfig(prev => ({
          ...prev,
          template: style,
          primaryColor: colors?.primary || prev.primaryColor,
          secondaryColor: colors?.secondary || prev.secondaryColor,
      }));
  };

  const handleColorChange = (primary: string, secondary: string) => {
    setCardConfig(prev => ({ ...prev, primaryColor: primary, secondaryColor: secondary }));
  };

  return (
    <div className="text-gray-300">
      <header className="text-center mb-8">
        <h1 className="font-bebas text-5xl tracking-widest text-white">Pro-Rugby</h1>
        <h2 className="text-2xl font-bebas tracking-wider text-yellow-400">ID Creator</h2>
      </header>

      <Section title="Image Center">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-900 border-2 border-gray-600 overflow-hidden flex-shrink-0">
            {playerData.playerImage && <img src={playerData.playerImage} alt="Player" className="w-full h-full object-cover" />}
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <button onClick={onOpenCamera} className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
              <CameraIcon className="w-5 h-5 mr-2" /> Capture Live Photo
            </button>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={onImageUpload} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition duration-200">
              <UploadIcon className="w-5 h-5 mr-2" /> Upload from Device
            </button>
          </div>
        </div>
      </Section>
      
      <Section title="Player Identity">
        <InputField label="Full Name" name="fullName" value={playerData.fullName} onChange={onPlayerDataChange} />
        <InputField label="Date of Birth" name="dob" value={playerData.dob} onChange={onPlayerDataChange} type="date" />
        <InputField label="Rugby Team Name" name="teamName" value={playerData.teamName} onChange={onPlayerDataChange} />
        <div className="mb-3">
            <label htmlFor="position" className="block text-sm font-bold text-gray-400 mb-1">Player Position</label>
            <select
                id="position"
                name="position"
                value={playerData.position}
                onChange={onPlayerDataChange}
                className="w-full bg-gray-900 text-white rounded-md border-2 border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 px-3 py-2 transition duration-200"
            >
                {Object.values(PlayerPosition).map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                ))}
            </select>
        </div>
        <InputField label="Physical Address" name="address" value={playerData.address} onChange={onPlayerDataChange} />
        <InputField label="Twitter Handle" name="twitterHandle" value={playerData.twitterHandle || ''} onChange={onPlayerDataChange} />
        <InputField label="Instagram Handle" name="instagramHandle" value={playerData.instagramHandle || ''} onChange={onPlayerDataChange} />
      </Section>

      <Section title="Physical Dimensions">
        <label htmlFor="cardFormat" className="block text-sm font-bold text-gray-400 mb-1">Select Card Format</label>
        <select
            id="cardFormat"
            name="cardFormat"
            value={cardConfig.cardFormat}
            onChange={onConfigChange}
            className="w-full bg-gray-900 text-white rounded-md border-2 border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 px-3 py-2 transition duration-200"
        >
            {Object.values(CardFormat).map(format => (
                <option key={format} value={format}>{format}</option>
            ))}
        </select>
      </Section>

      <Section title="Design Engine">
        <h4 className="text-sm font-bold text-gray-400 mb-2">Templates</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.values(TemplateStyle).map((style, index) => {
                const colors = templateColors[index];
                return (
                    <button key={style} onClick={() => handleTemplateChange(style)} className={`h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${cardConfig.template === style ? 'border-yellow-400 scale-105' : 'border-gray-600 hover:border-gray-500'}`}>
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{backgroundColor: colors.primary, color: colors.secondary}}>
                            {style}
                        </div>
                    </button>
                )
            })}
        </div>
        <h4 className="text-sm font-bold text-gray-400 mb-2">Color Customizer</h4>
        <div className="flex flex-wrap gap-2">
            {templateColors.map(({name, primary, secondary}) => (
                <button key={name} onClick={() => handleColorChange(primary, secondary)} className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex overflow-hidden ${cardConfig.primaryColor === primary ? 'border-yellow-400 scale-110' : 'border-gray-600 hover:border-gray-400'}`}>
                    <div className="w-1/2 h-full" style={{backgroundColor: primary}}></div>
                    <div className="w-1/2 h-full" style={{backgroundColor: secondary}}></div>
                </button>
            ))}
        </div>
      </Section>

      <Section title="Generate Files">
          <div className="grid grid-cols-2 gap-4">
              <button onClick={onExportPDF} className="flex flex-col items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-2 rounded-md transition duration-200 space-y-1">
                  <PdfIcon className="w-10 h-10" />
                  <span className="text-sm">Export to PDF</span>
              </button>
              <button onClick={onExportJPEG} className="flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-2 rounded-md transition duration-200 space-y-1">
                  <JpegIcon className="w-10 h-10" />
                  <span className="text-sm">Save as JPEG</span>
              </button>
          </div>
      </Section>
    </div>
  );
};
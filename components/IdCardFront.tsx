
import React, { forwardRef } from 'react';
import { CardConfig, PlayerData, TemplateStyle } from '../types';

interface IdCardFrontProps {
  playerData: PlayerData;
  cardConfig: CardConfig;
}

export const IdCardFront = forwardRef<HTMLDivElement, IdCardFrontProps>(({ playerData, cardConfig }, ref) => {
    const { template, primaryColor, secondaryColor } = cardConfig;
    const { playerImage, fullName, dob, teamName, position } = playerData;

    const baseCardClasses = "w-full h-full rounded-xl shadow-2xl overflow-hidden relative text-white font-sans flex flex-col justify-between p-4 bg-cover bg-center";

    return (
        <div ref={ref} className={baseCardClasses} style={{ backgroundColor: primaryColor }}>
            {/* Template-specific backgrounds and overlays */}
            {template === TemplateStyle.A && (
                <>
                    <div className="absolute top-0 right-0 h-full w-2/3 origin-bottom-right -skew-x-12" style={{ backgroundColor: secondaryColor }}></div>
                    <div className="absolute top-0 right-0 h-full w-2/3 origin-bottom-right -skew-x-12 bg-gray-900/50"></div>
                </>
            )}
            {template === TemplateStyle.B && (
                 <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50"></div>
            )}
            {template === TemplateStyle.C && (
                <div className="absolute left-0 top-0 h-full w-1/3" style={{ backgroundColor: secondaryColor }}></div>
            )}
            {template === TemplateStyle.D && (
                <div className="absolute top-0 left-0 w-full h-1/3" style={{ backgroundColor: secondaryColor }}></div>
            )}

            {/* Content layout based on template */}
            <div className="relative z-10 w-full h-full flex">
                {template === TemplateStyle.A && (
                    <div className="w-full flex flex-col justify-between">
                       <div className="flex justify-between items-start">
                           <div className="w-2/5">
                               {playerImage && <img src={playerImage} className="w-24 h-24 object-cover rounded-md border-4" style={{borderColor: secondaryColor}} alt="Player"/>}
                           </div>
                           <div className="w-3/5 text-right font-bebas tracking-wider">
                                <p className="text-sm" style={{color: secondaryColor}}>PLAYER ID</p>
                                <p className="text-4xl leading-8" style={{color: primaryColor}}>{teamName}</p>
                           </div>
                       </div>
                       <div className="text-left">
                           <p className="font-bebas text-4xl leading-9">{fullName}</p>
                           <p className="text-xs font-bold" style={{color: secondaryColor}}>DOB: {dob}</p>
                           <p className="text-xs font-bold uppercase mt-1">{position}</p>
                       </div>
                    </div>
                )}
                {template === TemplateStyle.B && (
                     <div className="w-full flex flex-col items-center justify-center text-center">
                        {playerImage && <img src={playerImage} className="w-28 h-28 object-cover rounded-full border-4" style={{borderColor: secondaryColor}} alt="Player"/>}
                        <p className="font-bebas text-4xl mt-2">{fullName}</p>
                        <p className="font-bold text-lg" style={{color: secondaryColor}}>{teamName}</p>
                        <p className="text-xs mt-1">DOB: {dob}</p>
                        <p className="text-xs uppercase">{position}</p>
                     </div>
                )}
                {template === TemplateStyle.C && (
                     <div className="w-full flex items-center">
                        <div className="w-1/3 flex flex-col items-center justify-center h-full">
                           {playerImage && <img src={playerImage} className="w-24 h-24 object-cover rounded-md" alt="Player"/>}
                        </div>
                        <div className="w-2/3 pl-4 flex flex-col justify-center">
                            <p className="font-bebas text-3xl leading-7">{fullName}</p>
                            <p className="font-bold text-md mb-2">{teamName}</p>
                            <div className="h-1 w-1/4 mb-2" style={{backgroundColor: secondaryColor}}></div>
                            <p className="text-xs font-bold">DOB: {dob}</p>
                            <p className="text-xs font-bold uppercase mt-1">{position}</p>
                        </div>
                     </div>
                )}
                {template === TemplateStyle.D && (
                    <div className="w-full flex flex-col justify-between">
                        <div className="h-1/3 flex items-center">
                            <p className="font-bebas text-4xl" style={{color: primaryColor}}>{teamName}</p>
                        </div>
                        <div className="flex items-end space-x-4">
                           {playerImage && <img src={playerImage} className="w-24 h-24 object-cover rounded-md border-4" style={{borderColor: secondaryColor}} alt="Player"/>}
                           <div>
                               <p className="font-bebas text-4xl leading-8">{fullName}</p>
                               <p className="text-xs font-bold">DOB: {dob}</p>
                               <p className="text-xs font-bold uppercase mt-1">{position}</p>
                           </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});
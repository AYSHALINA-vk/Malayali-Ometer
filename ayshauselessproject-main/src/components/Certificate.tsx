import React, { useRef } from 'react';
import { X, Download } from 'lucide-react';

interface CertificateProps {
  result: {
    score: number;
    title: string;
    badge: string;
  };
  onClose: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ result, onClose }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = () => {
    if (certificateRef.current) {
      // Create a canvas from the certificate div
      import('html2canvas').then((html2canvas) => {
        html2canvas.default(certificateRef.current!, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true
        }).then((canvas) => {
          const link = document.createElement('a');
          link.download = `malayali-meter-certificate-${result.score}%.png`;
          link.href = canvas.toDataURL();
          link.click();
        });
      }).catch(() => {
        // Fallback: just copy the result text
        const text = `🏆 MALAYALI-OMETER CERTIFICATE 🏆\n\nThis certifies that I am ${result.score}% Malayali!\n\n${result.title}\n\nBadge: ${result.badge}\n\nAwarded by the Kerala Vibes Institute (Totally Legitimate)`;
        navigator.clipboard.writeText(text).then(() => {
          alert('Certificate text copied to clipboard!');
        });
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Your Certificate</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Certificate */}
        <div className="p-6">
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 border-8 border-yellow-400 rounded-2xl p-8 text-center relative overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute top-4 left-4 text-6xl opacity-10">🥥</div>
            <div className="absolute top-4 right-4 text-6xl opacity-10">🌴</div>
            <div className="absolute bottom-4 left-4 text-6xl opacity-10">🛶</div>
            <div className="absolute bottom-4 right-4 text-6xl opacity-10">🎭</div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
              <div className="border-4 border-green-400 rounded-xl p-1">
                <div className="border-2 border-dashed border-green-300 rounded-lg p-6">
                  <h1 className="text-3xl font-bold text-green-800 mb-2">
                    🏆 MALAYALI-OMETER 🏆
                  </h1>
                  <h2 className="text-xl font-bold text-gray-700 mb-4">
                    OFFICIAL CERTIFICATE
                  </h2>
                  
                  <div className="text-lg text-gray-600 mb-6">
                    This certifies that
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 mb-6 shadow-inner">
                    <div className="text-2xl font-bold text-blue-800 mb-2">
                      A Distinguished Individual
                    </div>
                    <div className="text-lg text-gray-600">
                      has achieved a remarkable score of
                    </div>
                    <div className="text-6xl font-bold text-green-600 my-4">
                      {result.score}%
                    </div>
                    <div className="text-lg text-gray-600">
                      on the Malayali Cultural Assessment
                    </div>
                  </div>

                  <div className="bg-yellow-100 rounded-lg p-4 mb-6">
                    <div className="text-lg font-bold text-yellow-800 mb-2">
                      Classification:
                    </div>
                    <div className="text-xl font-bold text-yellow-900">
                      {result.title}
                    </div>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-4 mb-6">
                    <div className="text-lg font-bold text-blue-800 mb-2">
                      Special Badge Awarded:
                    </div>
                    <div className="text-xl font-bold text-blue-900">
                      {result.badge}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 space-y-1">
                    <div>Awarded by the Kerala Vibes Institute</div>
                    <div>(Authenticity not guaranteed)</div>
                    <div>Date: {new Date().toLocaleDateString()}</div>
                  </div>

                  <div className="mt-6 flex justify-center space-x-8">
                    <div className="text-center">
                      <div className="border-t-2 border-gray-400 w-24 mb-1"></div>
                      <div className="text-xs text-gray-600">Dr. Coconut</div>
                      <div className="text-xs text-gray-500">Chief Assessor</div>
                    </div>
                    <div className="text-center">
                      <div className="border-t-2 border-gray-400 w-24 mb-1"></div>
                      <div className="text-xs text-gray-600">Prof. Backwater</div>
                      <div className="text-xs text-gray-500">Cultural Director</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={downloadCertificate}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Download size={20} />
              <span>Download Certificate</span>
            </button>
          </div>

          <div className="text-center mt-4 text-sm text-gray-500">
            Share this certificate on social media to show off your Kerala credentials!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
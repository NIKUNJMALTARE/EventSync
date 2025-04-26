
// import { useState, useEffect } from 'react';
// import { ROUNDS } from '@/utils/teamData';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// interface RoundTabsProps {
//   activeRound: string;
//   onRoundChange: (round: string) => void;
// }

// const RoundTabs = ({ activeRound, onRoundChange }: RoundTabsProps) => {
//   const [mounted, setMounted] = useState(false);
  
//   // This ensures the animation only happens after the component is mounted
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <div className={`transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
//       <Tabs defaultValue={activeRound} onValueChange={onRoundChange} className="w-full">
//         <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto">
//           {ROUNDS.map((round) => (
//             <TabsTrigger 
//               key={round} 
//               value={round}
//               className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
//             >
//               {round}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//       </Tabs>
//     </div>
//   );
// };

// export default RoundTabs;

import { useState, useEffect } from 'react';
import { ROUNDS } from '@/utils/teamData';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RoundTabsProps {
  activeRound: string;
  onRoundChange: (round: string) => void;
}

const RoundTabs = ({ activeRound, onRoundChange }: RoundTabsProps) => {
  const [mounted, setMounted] = useState(false);
  
  // This ensures the animation only happens after the component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
  <Tabs 
    defaultValue={activeRound} 
    onValueChange={onRoundChange} 
    className="w-full"
  >
    <TabsList 
      className="w-full grid grid-cols-2 md:grid-cols-4 h-auto bg-slate-950 rounded-lg p-1"
    >
      {ROUNDS.map((round) => (
        <TabsTrigger 
          key={round} 
          value={round}
          className="py-3 px-4 m-3 text-white font-semibold rounded-md transition-all 
                     data-[state=active]:bg-gray-50 data-[state=active]:text-black
                      hover:text-blue-600"
        >
          {round}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
</div>

  );
};

export default RoundTabs;
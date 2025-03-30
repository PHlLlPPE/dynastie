interface Props {
    jauges: { peuple: number; trésor: number; foi: number; armée: number };
  }
  
  export default function Jauges({ jauges }: Props) {
    return (
      <div className="flex justify-around bg-gray-100 p-4 rounded-xl mb-4 text-center">
        {Object.entries(jauges).map(([nom, valeur]) => (
          <div key={nom}>
            <p className="uppercase text-xs font-semibold">{nom}</p>
            <div className="w-16 h-2 bg-gray-300 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${valeur}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

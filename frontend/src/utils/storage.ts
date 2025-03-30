export const getJauges = () => {
    const saved = localStorage.getItem("jauges");
    if (saved) return JSON.parse(saved);
    return { peuple: 50, trésor: 50, foi: 50, armée: 50 };
  };
  
  export const saveJauges = (jauges: any) => {
    localStorage.setItem("jauges", JSON.stringify(jauges));
  };
  

const colors = ["#2563eb", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

export interface RobotPoint {
    lat: number;
    lng: number;
    label: string;
    orientation: number;
    colour: string;
}

const getPoints = (): RobotPoint[] => {
    return [
        { lat: 42.2808, lng: -83.7430, label: "Robot 1", orientation: 20, colour: colors[0]},
        { lat: 42.3314, lng: -83.0458, label: "Robot 2", orientation: 200, colour: colors[1]} ,
        { lat: 42.2917, lng: -83.7158, label: "Robot 3", orientation: 35, colour: colors[2]},
        { lat: 42.3220, lng: -83.5000, label: "Robot 4", orientation: 100, colour: colors[3]},
        { lat: 42.1000, lng: -83.6770, label: "Robot 5", orientation: 230, colour: colors[4]},
        { lat: 42.2220, lng: -83.2300, label: "Robot 6", orientation: 290, colour: colors[5]}
    ];
}

export default getPoints
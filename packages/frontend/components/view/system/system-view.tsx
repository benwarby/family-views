import WeekdayRoutine from "./weekday-routine";

export default function SystemView({systemContent}:{systemContent:string}) {
    switch(systemContent) {
        case "weekday-routine": {
            return (<><WeekdayRoutine></WeekdayRoutine></>)
        }
    }

    return (<>Uh oh.  We couldn't find '{systemContent}''.</>)
}
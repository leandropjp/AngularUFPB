export class MyEvent {
    $key?: string;
    id: number;
    title?: string;
    start: string;
    end?: string;
    description?: string;
    owner: string;
    allDay: boolean = false;
    color: string;
    academico?: boolean = false;
    casual?: boolean = false;
    criador: string;
    startEditable?: boolean = false;
}
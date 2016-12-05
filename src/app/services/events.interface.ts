export interface MyEvent {
    $key?: string;
    id: number;
    title?: string;
    start: string;
    end?: string;
    description?: string;
    owner: string;
    allDay: boolean;
    color: string;
    academico?: boolean;
    casual?: boolean;
    criador: string;
    startEditable?: boolean;
}

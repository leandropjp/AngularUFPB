import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FirebaseService } from './../services/firebase.service';
import { AngularFire } from 'angularfire2';
import { User } from './../shared/user.interface';
import { MyEvent } from './../services/myEvent';

declare var moment: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

    events: any[];

    header: any;

    br: any;

    event: MyEvent;
    dialogVisible: boolean = false;
    detailVisible: boolean = false;

    startDate: any;

    endData: any;
    user: any;
    idGen: number = 100;
    // private eventService: EventService,
    constructor( private cd: ChangeDetectorRef, private _firebaseService: FirebaseService, private _af: AngularFire) {
        this._firebaseService.getEvents().subscribe(rooms => {
          this.events = rooms;
        });
    }

    ngOnInit() {
      this.br = {
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
                'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        };
      //  this.eventService.getEvents().then(events => {this.events = events;});

        this.header = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }

    handleDayClick(event) {
        this.event = new MyEvent();
        this.event.start = event.date.format('DD/MM/YYYY HH:mm');
       // this.event.start = event.date.format();
        this.dialogVisible = true;
        this.detailVisible = false;
        // trigger detection manually as somehow only moving the mouse quickly after click triggers the automatic detection
        this.cd.detectChanges();
    }


    handleEventClick(e) {
        this.event = new MyEvent();
        this.event.$key = e.calEvent.$key;
        this.event.title = e.calEvent.title;
        let start = e.calEvent.start;
        let end = e.calEvent.end;
        if (e.view.name === 'month') {
            //start.stripTime();
        }

        if (end) {
          //  end.stripTime();
            this.event.end = end.format('DD/MM/YYYY HH:mm');
        }
      
        this.event.id = e.calEvent.id;
        this.event.start = start.format('DD/MM/YYYY HH:mm');
        this.event.allDay = e.calEvent.allDay;
        this.event.criador = e.calEvent.criador;
        if (e.calEvent.description != undefined) {
            this.event.description = e.calEvent.description;
        }

        if (e.calEvent.owner === this._firebaseService.user.uid) {
            this.dialogVisible = true;
            this.detailVisible = false;
        } else {
            this.dialogVisible = false;
            this.detailVisible = true;
        }
    }
    closeDialog() {
        this.detailVisible = false;
    }

    updateEvent(){
        let finalDateEnd: string;
        let date = this.event.start.split(" ");
            let day = date[0].split("/");
            let time = date[1];
            let finalDate = day[2]+"-"+day[1]+"-"+day[0]+"T"+time+":00"
            this.event.start = finalDate;
        if (this.event.end != undefined){
            let dateEnd = this.event.end.split(" ");
            let dayEnd = dateEnd[0].split("/");
            let timeEnd = dateEnd[1];
            finalDateEnd = dayEnd[2]+"-"+dayEnd[1]+"-"+dayEnd[0]+"T"+timeEnd+":00"
            this.event.end = finalDateEnd;
        }
        if (this.event.academico) {
              //  this.event.color = '#4d4dff';
            }
            if (this.event.casual) {
                this.event.color = '#33cc33';
            }
        var newEvent = {
        id: this.idGen,
        title: this.event.title,
        start: this.event.start,
        end: '',
        description : '',
        owner: this._firebaseService.user.uid,
        allDay: this.event.allDay,
        color: '',
        academico: this.event.academico,
        casual: this.event.casual,
        criador: this._firebaseService.user.name,
        startEditable: false
        };
        if (this.event.end != undefined){
            newEvent.end = finalDateEnd;
        }

        if (this.event.description != undefined) {
            newEvent.description = this.event.description;
        }
        if (this.event.color != undefined ){
            newEvent.color = this.event.color;
        }
        
        this._firebaseService.updateEvents(this.event.$key, newEvent);
    }
    saveEvent() {
        
        // update
        if (this.event.id) {
            this.updateEvent();
        }
        // new
        else {
            alert("passou aqui tb");
            if (this.event.academico) {
              //  this.event.color = '#4d4dff';
            }
            if (this.event.casual) {
                this.event.color = '#33cc33';
            }
            let date = this.event.start.split(" ");
            let day = date[0].split("/");
            let time = date[1];
            let finalDate = day[2]+"-"+day[1]+"-"+day[0]+"T"+time+":00"
            this.event.start = finalDate;
            
            let date1 = this.event.end.split(" ");
            let day1 = date1[0].split("/");
            let time1 = date1[1];
            let finalDate1 = day1[2]+"-"+day1[1]+"-"+day1[0]+"T"+time1+":00"
            this.event.end = finalDate1;

            this.event.criador = this._firebaseService.user.name;
            this.event.id = this.idGen;
            this.event.owner = this._firebaseService.user.uid;
            this._firebaseService.addEvents(this.event);
           console.log(this.event);
           // this.events.push(this.event);
            this.event = null;
        }

        this.dialogVisible = false;
    }

    deleteEvent() {
        this._firebaseService.deleteEvents(this.event.$key);
        this.dialogVisible = false;
        this.detailVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }
}





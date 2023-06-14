import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Users } from './user';
import { usersService } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pageSize = 5;
  i:number = 1;
  desde:number =0;
  hasta:number =5;

  users:Users[];

  constructor(private userService:usersService,private router: Router) { 
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      result=>{
        this.users=result.data;
      }
    );
  }

  cambiarpagina(e:PageEvent){
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
    console.log(this.desde);
    console.log(this.hasta);
  }

  mostrarDetalles(id: string) {
    this.userService.getOneUser(id).subscribe(
      result=>{
        alert(
          "Detalles \n" + 
          "Nombres:  " + result.data.name + "\n" +
          "Documento:  " + result.data.document + "\n" +
          "Correo:  " + result.data.email + "\n" +
          "Direccion:  " + result.data.address + "\n" +
          "Telefono:  " + result.data.telephone + "\n"
        );
      }
    );
  }
}
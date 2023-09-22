import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellingPoint } from 'src/app/models/selling_point';
import { AuthService } from 'src/app/services/auth.service';
import { SellingPointService } from 'src/app/services/selling_point.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  public user:string;
  public password:string;
  public sellingPointId:number;
  public sellingPointsList:SellingPoint[];

  public sellingPointIdValidator = new FormControl('', [Validators.required]); 
  public userValidator = new FormControl('', [Validators.required]); 
  public passwordValidator = new FormControl('', [Validators.required]); 

  constructor(private sellingPointService:SellingPointService,
              private authService:AuthService,
              private router:Router){}

  ngOnInit(): void {
    this.sellingPointService.findAll().subscribe(result => {this.sellingPointsList = result; console.log(result)});

    if(this.authService.isAuthenticated()){
      console.log("usuario logueado");
      this.router.navigate(['/invoice']);
      return;
    }
  }
  

  public login():void {
    console.log("ingreso");
    if(this.formIsInvalid()) {
      console.log("invalido");
      return; 
    }

    this.authService.login(this.user,this.password,this.sellingPointId)
                    .subscribe(response =>{
                      console.log(response.access_token);
                      this.authService.saveUserData(response.access_token);
                      this.authService.saveTokenData(response.access_token);
                      this.router.navigate(['/invoice'])
                    },
                    (errror)=> swal("Error","Usuario o contraseña incorrecta, por favor valide sus datos", 'error') );

  }

  private formIsInvalid():boolean{
    this.userValidator.markAsTouched();
    this.sellingPointIdValidator.markAsTouched();
    this.passwordValidator.markAsTouched();
    return this.userValidator.invalid || this.sellingPointIdValidator.invalid ||
           this.passwordValidator.invalid;
  }


  




}

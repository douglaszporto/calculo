Graficos = {
	alturaY: 0,
	proporcaoCima: 0,
	canvas: '',
	canvasBloco: '',
	obj: '',
	objBloco: '',
	maiorValor: 0,
	menorValor: 0,
	linhaCima: 0,
	linhaBaixo: 0,
	pronto: false,
	UltimoX: 0,
	UltimoY: 0,
	Cnt : 0,
	nroPts : 1,
	molaY: 150,
	massaY :-1000,
	
	definicoesIniciais: function(){
		this.alturaY = 0;
		this.proporcaoCima = 0;
		this.maiorValor = 0;
		this.menorValor = 0;
		this.linhaCima = 0;
		this.linhaBaixo = 0;
		this.pronto = false;
		this.UltimoX = 0;
		this.UltimoY = 0;
		this.Cnt  = 0;
		this.nroPts  = 1;
		this.canvasBloco = document.getElementById('animacao');
		this.objBloco = this.canvasBloco.getContext('2d');
		this.canvasBloco.setAttribute('width','210');
		this.canvasBloco.setAttribute('height','520');
		this.canvas = document.getElementById('grafico');
		this.obj = this.canvas.getContext('2d');
		this.canvas.setAttribute('width','780');
		this.canvas.setAttribute('height','520');
	},
	
	ExibeLinha: function(x1,y1,x2,y2,tipo){
		var o;
		if(tipo==1){
			o = this.obj;
		}else{
			o = this.objBloco;
		}
		o.beginPath();
			o.moveTo(x1,y1);
			o.lineTo(x2,y2);
		o.stroke();
		o.closePath();
	},
	
	MostraTetoAnimacao: function(){
		this.canvasBloco = document.getElementById('animacao');
		this.objBloco = this.canvasBloco.getContext('2d');
		this.canvasBloco.setAttribute('width','210');
		this.canvasBloco.setAttribute('height','520');
		this.objBloco.lineWidth   = 2;
		this.objBloco.strokeStyle = '#000';
		this.ExibeLinha(55,20,130,20,2);
		for(i=0;i<10;i++){
			this.ExibeLinha(60+(i*7),20,65+(i*7),10,2);
		}
		this.objBloco.save();
	},
	
	LimpaFrameMola: function(){
		this.objBloco.clearRect(75,21,34,this.molaY+200);
	},
	
	AnimaMola: function(y){
		this.molaY = y;
		var nroPontoI = 0;
		var nroPontoF = 0;
		for(i=0;i<6;i++){
			nroPonto=Math.pow(-1,i);
			this.ExibeLinha( 92+(15*nroPonto),  (20+(i*this.molaY/6)),  92+(-15*nroPonto), ((20+(i*this.molaY/6))+((20+((i+1)*this.molaY/6))-(20+(i*this.molaY/6))))  ,  2);
			this.ExibeLinha( 92+(-15*nroPonto),  (20+(i*this.molaY/6)),  92+(15*nroPonto), ((20+(i*this.molaY/6))+((20+((i+1)*this.molaY/6))-(20+(i*this.molaY/6))))  ,  2);
		}
	},
	
	LimpaFrameMassa: function(y){
		this.objBloco.clearRect(50,y-42,84,84);
	},
	
	AnimaMassa: function(x,y){
		this.objBloco.lineWidth   = 2;
		this.objBloco.strokeStyle = '#000';
		this.objBloco.fillStyle = '#F00';
		this.objBloco.beginPath();
			this.objBloco.moveTo(x-40,y-40);
			this.objBloco.lineTo(x+40,y-40);
			this.objBloco.lineTo(x+40,y+40);
			this.objBloco.lineTo(x-40,y+40);
			this.objBloco.lineTo(x-40,y-40);
		this.objBloco.fill();
		this.objBloco.stroke();
		this.objBloco.closePath();
		this.massaY = y;
		
	},
	
	MostraBorda : function(){
		this.canvas = document.getElementById('grafico');
		this.obj = this.canvas.getContext('2d');
		this.maiorValor = Equacao.obtemMaiorValor();
		this.menorValor = Equacao.obtemMenorValor();
		
		this.canvas.setAttribute('width','780');
		this.canvas.setAttribute('height','520');
		this.obj.strokeStyle = '#000';
		this.obj.lineWidth   = 2;
		
		if(this.maiorValor <= 0){
			this.alturaY = 0;
			this.proporcaoCima = -1;
		}
		if(this.menorValor >= 0){
			this.alturaY = 499;
			this.proporcaoCima = 1;
		}
		if(this.maiorValor > 0 && this.menorValor < 0){
			var tamanhoTotal = this.maiorValor - this.menorValor;
			this.proporcaoCima  = (this.maiorValor/tamanhoTotal);
			this.alturaY = this.proporcaoCima*499;
		}
		
		this.ExibeLinha(0,this.alturaY,750,this.alturaY,1);
		this.ExibeLinha(1,0,1,500,1);
		
		this.UltimoX=0;
		this.UltimoY= this.alturaY-(Equacao.valores[0]*(this.alturaY*this.proporcaoCima/this.maiorValor));
	},
	
	MontaGrafico: function(){
		this.obj.strokeStyle = '#F00';
		this.obj.lineWidth   = 1;
		this.CalculaLinhas();
		this.MontaGrade();
		window.setInterval("Graficos.AnimaGrafico()",2);
	},
	
	CalculaLinhas: function(){
		for(i in Equacao.indices){
			if(Equacao.valores[i] == this.menorValor || Equacao.valores[i] == this.maiorValor){
				var status = Equacao.valores[i] == this.menorValor ? -4 : 13;
				var tipoLinha = Equacao.valores[i] == this.menorValor ? 2 : 1;
				this.obj.font         = 'bold 11px arial';
				this.obj.textBaseline = 'top';
				var valor = (Math.round(Equacao.valores[i]*100))/100;
				if(Equacao.valores[i] == this.maiorValor){
					this.linhaCima = this.alturaY-(Equacao.valores[i]*(this.alturaY*this.proporcaoCima/this.maiorValor));
					this.obj.fillText(''+valor, 5, this.linhaCima-(status));
				}else{
					this.linhaBaixo = this.alturaY-(Equacao.valores[i]*(this.alturaY*this.proporcaoCima/this.maiorValor));
					this.obj.fillText(''+valor, 5, this.linhaBaixo-(status));
				}
			}
		}
	},
	
	AnimaGrafico: function(){
		var i=this.Cnt;
		var nroPontos = this.nroPts;
		if(i <= Equacao.precisao){
			this.MostraTetoAnimacao();
			switch (nroPontos){
				case 1:{
					this.obj.beginPath();
					this.obj.moveTo(this.UltimoX,this.UltimoY);
					this.Cnt++;
					this.nroPts=2;
					break;
				}
				case 2:{
					this.obj.lineTo(Equacao.indices[i]*750/Equacao.limiteSup,this.alturaY-(Equacao.valores[i]*(this.alturaY*this.proporcaoCima/this.maiorValor)));	
					this.UltimoX=Equacao.indices[i]*750/Equacao.limiteSup;
					this.UltimoY=this.alturaY-(Equacao.valores[i]*(this.alturaY*this.proporcaoCima/this.maiorValor));
					this.obj.stroke();
					this.obj.closePath();
					this.Cnt+=1;
					this.nroPts=1;
					break;
				}
			}
			if(i != Equacao.precisao){
				this.LimpaFrameMola();
				this.LimpaFrameMassa(this.massaY);
			}
			this.AnimaMassa(92,this.alturaY-(Equacao.valores[i]*(this.alturaY*this.proporcaoCima/this.maiorValor)));
			this.AnimaMola(this.alturaY-(Equacao.valores[i]*(this.alturaY*this.proporcaoCima/this.maiorValor))-60);
		}
	},
	
	MontaGrade: function(){
		
		this.obj.strokeStyle = '#999';
		this.obj.lineWidth   = 1;
		this.obj.fillStyle = '#999';
		this.obj.font         = 'normal 9px arial';
		this.obj.textBaseline = 'top';
		
		var incremento = ((this.alturaY-this.linhaCima)/this.maiorValor)*Equacao.escalaVertical;
		for(i=this.linhaCima;i<=500;i+=incremento){
			this.ExibeLinha(0,i,750,i,1);
			this.obj.fillText(''+Math.round(((this.alturaY-i)*this.maiorValor/(this.alturaY-this.linhaCima))*100)/100, 753, i);
		}
		for(i=this.linhaCima;i>=0;i-=incremento){
			this.ExibeLinha(0,i,750,i,1);
			this.obj.fillText(''+Math.round(((this.alturaY-i)*this.maiorValor/(this.alturaY-this.linhaCima))*100)/100, 753, i);
		}
		
		for(j=0;j<=750;j+=750/Equacao.escalaHorizontal){
			this.ExibeLinha(j,0,j,500,1);
			this.obj.fillText(''+Math.round((j*Equacao.limiteSup/750)*100)/100, j, 500);
		}
		this.obj.strokeStyle = '#F00';
		
	}

}
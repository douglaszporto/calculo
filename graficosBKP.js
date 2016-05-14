Graficos = {
	alturaY: 0,
	proporcaoCima: 0,
	canvas: '',
	obj: '',
	maiorValor: 0,
	menorValor: 0,
	linhaCima: 0,
	linhaBaixo: 0,
	
	ExibeLinha: function(x1,y1,x2,y2){
		this.obj.beginPath();
			this.obj.moveTo(x1,y1);
			this.obj.lineTo(x2,y2);
		this.obj.stroke();
		this.obj.closePath();
	},
	
	MostraBorda : function(){
		this.canvas = document.getElementById('grafico');
		this.obj = this.canvas.getContext('2d');
		this.maiorValor = Equacao.obtemMaiorValor();
		this.menorValor = Equacao.obtemMenorValor();
		
		this.canvas.setAttribute('width','780');
		this.canvas.setAttribute('height','550');
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
		
		this.ExibeLinha(0,this.alturaY,750,this.alturaY);
		this.ExibeLinha(1,0,1,500);
	},
	
	MontaGrafico: function(){
		this.obj.strokeStyle = '#F00';
		this.obj.lineWidth   = 1;
		this.obj.beginPath();
		var primeiroPonto = 1;
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
			if(primeiroPonto==1){
				primeiroPonto = 0;
				this.obj.moveTo(0,this.alturaY-(Equacao.valores[i]*(this.alturaY*this.proporcaoCima/this.maiorValor)));
			}else{
				this.obj.lineTo(Equacao.indices[i]*750/Equacao.limiteSup,this.alturaY-(Equacao.valores[i]*(this.alturaY*this.proporcaoCima/this.maiorValor)));	
			}
			//break;
		}
		this.obj.stroke();
		this.obj.closePath();
		this.MontaGrade();
	},
	
	
	AnimaGrafico: function(){
		
	},
	
	MontaGrade: function(){
		/*this.obj.strokeStyle = '#666';
		this.obj.lineWidth   = 1;
		this.ExibeLinha(0,this.linhaCima,750,this.linhaCima);
		this.ExibeLinha(0,this.linhaBaixo,750,this.linhaBaixo);*/
		
		this.obj.strokeStyle = '#999';
		this.obj.lineWidth   = 1;
		this.obj.fillStyle = '#999';
		this.obj.font         = 'normal 9px arial';
		this.obj.textBaseline = 'top';
		var incremento = ((this.alturaY-this.linhaCima)/this.maiorValor)*Equacao.escalaVertical;
		for(i=this.linhaCima;i<=500;i+=incremento){
			this.ExibeLinha(0,i,750,i);
			this.obj.fillText(''+Math.round(((this.alturaY-i)*this.maiorValor/(this.alturaY-this.linhaCima))*100)/100, 753, i);
		}
		for(i=this.linhaCima;i>=0;i-=incremento){
			this.ExibeLinha(0,i,750,i);
			this.obj.fillText(''+Math.round(((this.alturaY-i)*this.maiorValor/(this.alturaY-this.linhaCima))*100)/100, 753, i);
		}
		
		for(j=0;j<=750;j+=750/Equacao.escalaHorizontal){
			this.ExibeLinha(j,0,j,500);
			this.obj.fillText(''+Math.round((j*Equacao.limiteSup/750)*100)/100, j, 500);
		}
		
		
	}

}
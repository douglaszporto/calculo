var $pi = 3.14159265;
var $e = 2.71828182;
Equacao = {	
	valores : [],
	indices : [],
	limiteInf : 0,
	limiteSup : 0,
	precisao: 100,
	escalaVertical : 5,
	escalaHorizontal : 10,
	
	dificicoesIniciais: function(){
		this.valores = [];
		this.indices = [];
		this.limiteInf = 0;
		this.limiteSup = 0;
		this.precisao= 100;
		this.escalaVertical = 10;
		this.escalaHorizontal = 10;
	},
	
	definePrecisao: function(valor){
		this.precisao = valor;
	},
	
	defineEscalaVertical: function(valor){
		this.escalaVertical = valor;
	},
	
	defineEscalaHorizontal: function(valor){
		this.escalaHorizontal = this.limiteSup/valor;
	},
	
	montaValoresEquacao: function(equacao,limInferior,limSuperior){
		var y;
		this.limiteInf = limInferior;
		this.limiteSup = limSuperior;
		var acressimo = (limSuperior-limInferior)/this.precisao;
		var eq = 'y='+equacao;
		var eqNova = '';
		var cont = 0;
		for(i=limInferior;i<=limSuperior;i+=acressimo){
			eqNova = eq.replace(/x/gi,i);
			try{
				eval(eqNova);
			}catch(e){
				alert(e);
			}
			this.valores[cont]=y;
			this.indices[cont++]=i;
		}
	},
	
	obtemMaiorValor: function(){
		var i;
		var maior;
		var primeiroNumero = 1;
		for(i in this.valores){
			if(primeiroNumero == 1){
				maior = this.valores[i];
				primeiroNumero = 0;
			}else{
				if(maior < this.valores[i]){
					maior = this.valores[i];
				}
			}
		}
		return maior;
	},
	
	obtemMenorValor: function(){
		var i;
		var menor;
		var primeiroNumero = 1;
		for(i in this.valores){
			if(primeiroNumero == 1){
				menor = this.valores[i];
				primeiroNumero = 0;
			}else{
				if(menor > this.valores[i]){
					menor = this.valores[i];
				}
			}
		}
		return menor;
	}
}
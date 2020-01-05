'use strict';

const{Contract}=require('fabric-contract-api');

class RegistrarContract extends contract{
constructor(){

super('org.reg-network.regnet');

}

async instantiate(ctx){
	console.log('Registraction-Registrat Contract has been instantiated');
	}
async approveNewUser(ctx,userName,userAadhar){
	let caller=ctx.clientIdentity.getMSPID()
	if(caller=='registrarMSP')
	{



	const requestKey=ctx.stub.createCompositeKey('org.reg-network.usernet.request',[userName,userAadhar]);

	let RequestBuffer= await ctx.stub.getState(OwnerKey).catch(err=>console.log(err));
	
	const request= JSON.parse(RequestBuffer.toString());
	if(request.length==0) {
		throw new Error('Invalid Uer Request')
	}
	else{
	const userKey=ctx.stub.createCompositeKey('org.reg-network.regnet.user',[userName,userAadhar]);
	let initupg=0;
	let newUserObject={
		
		
		
		userName: request.userName,
		userEmail: request.userEmail,
		userPhn: request.userPhn,
		userAadhar: request.userAadhar,
		createdAt: request.createdAt,
		updatedAt:  new Date(),
		registerby: ctx.clientIdentity.getMSPID(),
		upgradCoins :initupg ,
		
	};	
		let dataBuffer =Buffer.from(JSON.stringify(newuserObject));
		await ctx.stub.putState(userKey,dataBuffer);
		return newUserObject;
	}
}
else {
	console.log("some non-registrar called this function")
} 

}


async approvePropertyRegistration(ctx){


	let caller=ctx.clientIdentity.getMSPID()
	if(caller=='registrarMSP')
	{
		
		const propertyRequestKey=ctx.stub.createCompositeKey('org.reg-network.usernet.propertyRequest',[propertyId]);

		const propertyrequest= JSON.parse(RequestBuffer.toString());
	if(request.length==0) {
		throw new Error('Invalid Uer Request')
	}
	else{
		const propertyKey=ctx.stub.createCompositeKey('org.reg-network.regnet.property',[propertyId]);
		
		let newPropertyObject={
			
			
			
			propertyId: propertyrequest.propertyId,
			propertyOwner: propertyrequest.OwnerKey,
			propertyPrice: propertyrequest.propertyPrice,
			propertyStatus: propertyrequest.propertyStatus,
			
		};	
			let dataBuffer =Buffer.from(JSON.stringify(newPropertyObject));
			await ctx.stub.putState(propertyKey,dataBuffer);
			return newPropertyObject;
		}
	}
	else{
		console.log("some non-registrar called this function")
	}
}
async viewUser(ctx,userName,userAadhar){
	const userKey=ctx.stub.createCompositeKey('org.reg-network.regnet.user',[userName,userAadhar]);
	let userBuffer = await ctx.stub.getState(userKey).catch(err=>console.log(err));
	return JSON.parse(userBuffer.toString());
}

async viewProperty(ctx,propertyId){
	const propertyKey=ctx.stub.createCompositeKey('org.reg-network.regnet.property',[propertyId]);
	let propertyBuffer = await ctx.stub.getState(propertyKey).catch(err=>console.log(err));
	return JSON.parse(propertyBuffer.toString());
}

}


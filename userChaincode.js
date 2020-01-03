'use strict';

const{Contract}=require('fabric-contract-api');

class UserContract extends contract{

constructor(){

super('org.reg-network.usernet');

}

async instantiate(ctx){
	console.log('Registraction-User Contract has been instantiated');
	}
	
	
	
	
async requestNewUser(ctx,userName,userEmail,userPhn,userAadhar){
	const requestKey=ctx.stub.createCompositeKey('org.reg-network.usernet.request',[userName,userAadhar]);
	let newRequestObject={
		userName: userName,
		userEmail: userEmail,
		userPhn: userPhn,
		userAadhar: userAadhar,
		createdAt: new Date(),
	};
	let userRequestBuffer =Buffer.from(JSON.stringify(newRequestObject));
	await ctx.stub.putState(requestKey,userRequestBuffer);
	return newRequestObject;
}




async rechargeAccount (ctx,userName,userAadhar,transactionId){
}




async viewProperty(ctx,propertyId){
	const propertyKey=ctx.stub.createCompositeKey('org.reg-network.regnet.property',[propertyId]);
	let propertyBuffer = await ctx.stub.getState(propertyKey).catch(err=>console.log(err));
	return JSON.parse(propertyBuffer.toString());
}

async viewUser(ctx,userName,userAadhar){
	const userKey=ctx.stub.createCompositeKey('org.reg-network.regnet.user',[userName,userAadhar]);
	let userBuffer = await ctx.stub.getState(userKey).catch(err=>console.log(err));
	return JSON.parse(userBuffer.toString());
}


async propertyRegistrationRequest(ctx,propertyId,propertyOwner,propertyPrice,propertyStatus,userName,userAadhar){
	const propertyRequestKey=ctx.stub.createCompositeKey('org.reg-network.usernet.propertyRequest',[propertyId]);
	const OwnerKey=ctx.stub.createCompositeKey('org.reg-network.regnet.request',[userName,userAadhar]);
	
	let OwnerBuffer= await ctx.stub.getState(OwnerKey).catch(err=>console.log(err));
	
	const Owner= JSON.parse(OwnerBuffer.toString());
	
	if(Owner== undefined){
		console.log("The user is not registered")
	}
	
	else{
	let newPropertyRequestObejct={
		propertyId: propertyId,
		propertyOwner: OwnerKey,
		propertyPrice: propertyPrice,
		propertyStatus: propertyStatus,
		
	}
	let propertyRequestBuffer=Buffer.from(JSON.stringify(newPropertyRequestObejct));
	await ctx.stub.putState(propertyRequestKey,propertyRequestBuffer);
	return newPropertyRequestObejct;
	}
}


async purchaseProperty(ctx,propertyId,userName,userAadhar){
}


}

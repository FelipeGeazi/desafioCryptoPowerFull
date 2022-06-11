// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {

    //Implementado (mais ou menos)
    function getTotalSupply() external view returns(uint256);
    function balanceOf(address account) external view returns(uint256);
    function transfer(address recipient, uint256 amount) external returns(bool);

    //Não implementados (ainda)
    //function allowence(address owner, address spender) external view returns(uint256);
    //function approve(address spender, uint256 amount) external returns(bool);
    //function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);

    //Implementado
    event Transfer(address from, address to, uint256 value);

    //Não está implementado (ainda)
    //event Approval(address owner, address spender, uint256 value);

}

contract TokenFullPower is IERC20 {


   // Enum
    enum Status { ACTIVE, PAUSED, CANCELLED } //ACTIVE=0, PAUSED=1, CANCELLED=2 -- uint8

    //Properties
    string  public constant name = "CryptoToken";
    string public constant symbol = "CRY";
    uint8 public constant decimals = 3;  //Default dos exemplos é sempre 18
    uint256 private totalSupply;
    Status public status;
    address private owner;
 
 // Modifier
 modifier isOwner() {
        require(msg.sender == owner , "Sender is not owner!");
        _;
    }

    mapping(address => uint256) public addressToBalance;

    // Events
   // event Transfer(address sender, address receiver, uint256 amount);
  //  event status()
   
 
    //Constructor
    constructor(uint256 TotaldeMoedas) {
        owner = msg.sender;
        totalSupply = TotaldeMoedas;
        addressToBalance[owner] = totalSupply;
    }

    //Public Functions
    function getTotalSupply() public override view returns(uint256) {
        return totalSupply;
    }

    function balanceOf(address tokenOwner) public override view returns(uint256) {
        return addressToBalance[tokenOwner];
    }

    //FIX: Ta feio, podemos melhorar
    function transfer(address receiver, uint256 quantity) public override returns(bool) {
        require (status == Status.ACTIVE,"Contract not ACTIVE");
        require(quantity <= addressToBalance[msg.sender], "Insufficient Balance to Transfer");
    
        addressToBalance[msg.sender] = addressToBalance[msg.sender] - quantity;
        addressToBalance[receiver] = addressToBalance[receiver] + quantity;
        emit Transfer(msg.sender, receiver, quantity);
    

        mint();

        return true;
    }

    
    function state() public view returns(Status) {
        return status;
    }


    function mint() private returns (uint256) {
        burn();
        totalSupply += 10;
        return totalSupply;
    }

    function burn() private {
         if(totalSupply >= 500){
            totalSupply = totalSupply / 2;
        }
    }

    function pausable() public isOwner {
        status = Status.PAUSED;

        
    }

    function activeCancelled (uint8 newStatus) public isOwner {
        if(newStatus == 0){
            status = Status.ACTIVE;
        }
        else if(newStatus == 2){
            status = Status.CANCELLED;
        }
      
    }




}
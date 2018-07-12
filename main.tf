provider "azure" {

} 

resource "azurerm_resource_group" "sunfile" {
  name = "production"
  location = "West US 2"
}

import { IsNumber, IsString } from "class-validator";

class BeekeperDto {
  @IsString()
  public id: string;
 
  @IsString()
  public fullname: string;
 
  @IsString()
  public location: string;

  @IsNumber()
  public activityStartDate: Number;

  @IsString()
  public infoCid: string;
}
 
export default BeekeperDto;
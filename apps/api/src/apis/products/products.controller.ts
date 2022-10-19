import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  FindProductsDto,
  UpdateProductDto,
  UpsertProductOptionDto,
} from './dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  find(@Query() findProductsDto: FindProductsDto) {
    return this.productsService.find(findProductsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Get(':id/options')
  findOptions(@Param('id') id: string) {
    return this.productsService.findOptions(+id);
  }

  @Put(':id/options')
  upsertOptions(
    @Param('id') id: string,
    @Body() upsertOptionsDto: UpsertProductOptionDto
  ) {
    return this.productsService.upsertOptions(+id, upsertOptionsDto);
  }
}

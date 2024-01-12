import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FollowersCounterPipe } from './pipes/followers-counter.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, FollowersCounterPipe],
  exports: [FollowersCounterPipe],
})
export class SharedModule {}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistOverviewComponent } from './artist-overview.component';

describe('ArtistOverviewComponent', () => {
  let component: ArtistOverviewComponent;
  let fixture: ComponentFixture<ArtistOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
